"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Simple Icons
const ArrowLeftIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
);
const DownloadIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
);

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  // Backend URL define karein (Taaki PDF sahi jagah se uthaye)
  const API_BASE_URL = "http://localhost:4000";

  const { token } = useSelector((state) => state.auth);

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ✅ HELPER FUNCTION: PDF ka sahi URL banane ke liye
  const getPdfUrl = (url) => {
    if (!url) return "#";
    // Agar URL pehle se full hai (Cloudinary/S3 wagera), toh wahi return karo
    if (url.startsWith("http")) return url;
    // Agar local path hai, toh uske aage http://localhost:4000 jodo
    return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  useEffect(() => {
    if (!id) return;

    if (!token) {
        toast.warning("Please login to read the full article.");
        router.push("/login"); 
        return;
    }

    const fetchArticleData = async () => {
      try {
        setLoading(true);
        // Backend API call
        const res = await fetch(`${API_BASE_URL}/api/articles/${id}/content`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        
        const data = await res.json();

        if (res.ok && data.article) {
          setArticle(data.article);
        } else {
          console.error("Error from backend:", data.message);
          setError(true);
        }
      } catch (err) {
        console.error("Failed to load article:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [id, token, router]);

  if (loading) return (
    <div className="max-w-3xl mx-auto py-20 px-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
      <div className="flex gap-4 mb-12">
        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );

  if (error || !article) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Article unavailable</h2>
      <p className="text-gray-500 mb-6">The article you are looking for has been moved, deleted, or you don't have permission to view it.</p>
      <Link href="/law/home" className="flex items-center text-sm font-medium text-gray-900 hover:underline">
        <ArrowLeftIcon /> Back to Library
      </Link>
    </div>
  );

  return (
    <article className="min-h-screen bg-white font-sans text-gray-900">
      <div className="max-w-3xl mx-auto py-16 px-6 sm:px-8">
        
        <button 
            onClick={() => router.back()} 
            className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors"
        >
           <ArrowLeftIcon /> Back
        </button>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-600">
              {article.category || "General"}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {new Date(article.submittedAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-8 text-gray-900">
            {article.title}
          </h1>

          <div className="flex items-center justify-between border-b border-gray-100 pb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                {article.authorName?.charAt(0) || "A"}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{article.authorName}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>

            {/* ✅ FIX: PDF URL function use kiya */}
            {article.currentPdfUrl && (
              <a 
                href={getPdfUrl(article.currentPdfUrl)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden sm:flex items-center text-sm font-medium text-gray-600 hover:text-black border border-gray-200 rounded-full px-4 py-2 hover:border-gray-400 transition-all"
              >
                <DownloadIcon /> PDF
              </a>
            )}
          </div>
        </header>

        {article.abstract && (
          <div className="text-xl text-gray-600 leading-relaxed mb-10 not-italic font-normal">
            {article.abstract}
          </div>
        )}

        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-xl">
          {article.contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          ) : article.content ? (
            <div className="whitespace-pre-wrap">
              {article.content}
            </div>
          ) : (
            <div className="p-6 bg-gray-50 rounded-lg text-center text-gray-500 text-sm">
              Preview text unavailable. Please download the PDF.
            </div>
          )}
        </div>

        {/* ✅ FIX: Mobile button me bhi URL fix kiya */}
        {article.currentPdfUrl && (
            <div className="mt-16 pt-8 border-t border-gray-100 sm:hidden">
                 <a 
                href={getPdfUrl(article.currentPdfUrl)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-black text-white text-sm font-medium px-6 py-4 rounded-lg active:scale-95 transition-transform"
              >
                <DownloadIcon /> Download Full PDF
              </a>
            </div>
        )}

      </div>
    </article>
  );
}