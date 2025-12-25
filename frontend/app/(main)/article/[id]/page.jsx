"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ArticlePage() {
  const params = useParams();
  const id = params?.id;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false); // Naya state error handle karne ke liye

  useEffect(() => {
    const fetchArticleData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // Console log lagaya hai taaki aap dekh sako exact URL kya hai
        console.log("Fetching Article ID:", id);
        
        const apiUrl = `http://localhost:4000/api/articles/${id}/content`;
        const res = await fetch(apiUrl);
        const data = await res.json();

        console.log("Backend response:", data);

        if (res.ok && data.article) {
          setArticle(data.article);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-sans">Loading article content...</div>;
  
  if (notFound) return (
    <div className="p-20 text-center font-sans">
      <h2 className="text-red-500 text-xl font-bold">Article Not Found</h2>
      <p className="text-gray-600 mt-2">Bhai, backend check karo, article database mein 'PUBLISHED' status mein hai?</p>
      <button onClick={() => window.location.reload()} className="mt-4 text-blue-500 underline">Try Again</button>
    </div>
  );

  return (
    <main className="max-w-4xl mx-auto py-10 px-5 font-sans bg-white">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{article.title}</h1>
      <div className="text-sm text-gray-500 mb-8 border-b pb-4 text-left">
        <p>By <span className="font-semibold text-black">{article.authorName}</span> | {new Date(article.submittedAt).toLocaleDateString()}</p>
      </div>

      <article 
        className="prose prose-lg lg:prose-xl max-w-none mb-10 text-justify text-gray-800"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }} 
      />

      <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex justify-between items-center gap-4">
        <div className="text-left">
          <h4 className="font-bold text-gray-900 text-left">Original Document</h4>
          <p className="text-sm text-gray-600 text-left">Aap is article ka original PDF download kar sakte hain.</p>
        </div>
        <a href={article.currentPdfUrl} target="_blank" className="bg-black text-white px-6 py-2 rounded-lg shrink-0">
          Download PDF
        </a>
      </div>
    </main>
  );
}