"use client";

import { useEffect } from 'react';

const LivereComments = () => {
  useEffect(() => {
    const scriptId = 'livere-script';

    // 스크립트가 이미 존재하면 중복 추가하지 않음 (React StrictMode 대응)
    if (document.getElementById(scriptId)) {
      return;
    }

    window.livereOptions = {
      refer: 'lsy-khe.vercel.app/',
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdn-city.livere.com/js/embed.dist.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      // 언마운트 시 컨테이너를 비워 중복 렌더링을 방지
      const container = document.getElementById('lv-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className=''>
      <div className="mt-12 text-center">
        <h1 className="text-sm font-MapoGoldenPier text-custom-blue">G U E S T B O O K</h1>
        <h1 className="text-xl font-MapoGoldenPier text-custom-blue">방명록</h1>
      </div>
      <div className='mx-5 mt-5 bg-bgcolor-sky' id="lv-container" data-id="city" data-uid="MTAyMC81OTkxNy8zNjM4MA==">
        {/* Comments will be loaded here by Livere */}
      </div>
    </div>

  );
};

export default LivereComments;