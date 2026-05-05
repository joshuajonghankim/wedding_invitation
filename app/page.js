'use client';
import Image from "next/image";
import Script from "next/script";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from 'react';

const LivereComments = dynamic(() => import('./LivereComments'), { ssr: false });

function copyText(entryText) {
  navigator.clipboard.writeText(entryText);
  alert("복사되었습니다.");
}

export default function Home() {
  const [showGroomAccounts, setShowGroomAccounts] = useState(false);
  const [showBrideAccounts, setShowBrideAccounts] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [touchCount, setTouchCount] = useState(0);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [autoPlayAttempted, setAutoPlayAttempted] = useState(false);

  const images = [
    { previewSrc: '/images/preview/g1.jpeg', fullSrc: '/images/g1.jpeg', alt: 'g1' },
    { previewSrc: '/images/preview/g2.jpeg', fullSrc: '/images/g2.jpeg', alt: 'g2' },
    { previewSrc: '/images/preview/g3.jpeg', fullSrc: '/images/g3.jpeg', alt: 'g3' },
    { previewSrc: '/images/preview/g4.jpeg', fullSrc: '/images/g4.jpeg', alt: 'g4' },
    { previewSrc: '/images/preview/g5.jpeg', fullSrc: '/images/g5.jpeg', alt: 'g5' },
    { previewSrc: '/images/preview/g6.jpeg', fullSrc: '/images/g6.jpeg', alt: 'g6' },
    { previewSrc: '/images/preview/g7.jpeg', fullSrc: '/images/g7.jpeg', alt: 'g7' },
    { previewSrc: '/images/preview/g8.jpeg', fullSrc: '/images/g8.jpeg', alt: 'g8' },
    { previewSrc: '/images/preview/g9.jpeg', fullSrc: '/images/g9.jpeg', alt: 'g9' },
    { previewSrc: '/images/preview/g10.jpeg', fullSrc: '/images/g10.jpeg', alt: 'g10' },
    { previewSrc: '/images/preview/g11.jpeg', fullSrc: '/images/g11.jpeg', alt: 'g11' },
    { previewSrc: '/images/preview/g12.jpeg', fullSrc: '/images/g12.jpeg', alt: 'g12' },
  ];

  useEffect(() => {
    // play & pause
    if (isPlaying) {
      audioRef.current.volume = volume;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(prevState => !prevState);
    setAnimateBounce(false);
  };

  // Attempt auto-play on component mount
  useEffect(() => {
    if (!autoPlayAttempted) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasPlayedOnce(true);
        })
        .catch(error => {
          console.log("Auto-play failed, retry on user interaction: ", error);
        })
        .finally(() => {
          setAutoPlayAttempted(true);
        });
    }
  }, [autoPlayAttempted]);

  // Play music on touch and retry until playing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleTouchOrDrag = () => {
        if (!hasPlayedOnce) {
          setTouchCount(prevCount => {
            const newCount = prevCount + 1;
            if (newCount >= 2) {
              if (audioRef.current.paused) {
                audioRef.current.play()
                  .then(() => {
                    setIsPlaying(true);
                    setHasPlayedOnce(true);
                  })
                  .catch(error => {
                    console.log("Failed to play audio: ", error);
                  });
              } else {
                setIsPlaying(true);
                setHasPlayedOnce(true);
              }
            }
            return newCount;
          });
        }
      };

      window.addEventListener('touchstart', handleTouchOrDrag, { passive: true });
      window.addEventListener('dragstart', handleTouchOrDrag, { passive: true });
      window.addEventListener('dragend', handleTouchOrDrag);

      return () => {
        window.removeEventListener('touchstart', handleTouchOrDrag);
        window.removeEventListener('dragstart', handleTouchOrDrag);
        window.removeEventListener('dragend', handleTouchOrDrag);
      };
    }
  }, [hasPlayedOnce]);

  useEffect(() => {
    // only client side
    if (typeof window !== 'undefined') {

      const newImageWidth = (window.innerHeight * 7 / 10 - 3) / 3;
      setImageWidth(newImageWidth);

      /*
      const handleResize = () => {
        // window.innerHeight를 이용하여 이미지 width 계산
        const newImageWidth = (window.innerHeight * 6 / 10 - 3) / 3;
        setImageWidth(newImageWidth);
      };

      // initialize and resize
      handleResize();
      window.addEventListener('resize', handleResize);

      // delete if unmount
      return () => window.removeEventListener('resize', handleResize);*/
    }

  }, []);

  const createMap = () => {
    if (window.naver && window.naver.maps) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.4163636, 126.8848772),
        zoom: 16
      };
      const map = new window.naver.maps.Map('map', mapOptions);
    }
  };

  const [clickCount, setClickCount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleButtonClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 20) {
      setIsSpinning(true);
    }
  };

  const [animateBounce, setAnimateBounce] = useState(true);

  const shareToKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendCustom({
        templateId: 109330,
      });
    }
  };

  return (
    <main className="overflow-x-hidden bg-bgcolor-sky">
      <div className="relative h-dvh w-dvh snap-mandatory snap-y overflow-y-auto flex flex-col">
        {/* Main page */}
        <div className="relative snap-center snap-always min-h-dvh min-w-full flex flex-col justify-center items-center bg-white">
          <div className="h-1.5/10 flex flex-col justify-center text-center font-Charter text-gray-700 p-0">
            <h1 className="text-3xl">July | 20 | 2024</h1>
            <h2 className="mt-2 text-sm tracking-widest">SATURDAY</h2>
          </div>

          <button className="max-w-8/10 h-6/10 p-0" onClick={handleButtonClick}>
            <Image
              src="/images/thumbnail.png"
              alt="thumbnail"
              width={1000}
              height={1500}
              className="hidden"
            />
            <Image
              src="/images/main.jpg"
              alt="cover_image"
              width={1000}
              height={1500}
              priority={true}
              className={`max-h-full w-auto object-contain ${isSpinning ? 'animate-spin' : ''}`}
            />
          </button>

          <div className="mt-6 h-2/10 flex flex-col justify-center text-center font-MapoGoldenPier text-gray-700 p-0">
            <h1 className="text-2xl">이성연 & 김한은</h1>
            <h1 className="mt-4 text-sm">2024년 7월 20일 (토) 오후 12시</h1>
            <h1 className="mt-1 text-sm">광명역사컨벤션웨딩홀</h1>
          </div>

        </div>

        <div className="snap-center snap-always min-h-dvh min-w-full flex justify-center items-center bg-white bg-cover bg-center">
          <div className="text-center text-wrap m-10">
            <h1 className="text-sm font-MapoGoldenPier text-custom-blue">I N V I T A T I O N</h1>
            <h1 className="text-xl font-MapoGoldenPier text-custom-blue">
              초대합니다<br></br><br></br>
            </h1>
            <h1 className="text-sm font-MapoGoldenPier text-gray-700 text-wrap leading-loose">
              주님의 사랑으로 만난 두 사람이<br></br>
              이제 새로운 가정을 이루는<br></br>
              아름다운 약속을 하려 합니다.<br></br><br></br>
              언제나 예수님 안에서 아름답고<br></br>
              주위에 사랑을 나누는<br></br>
              행복한 가정을 이루도록<br></br>
              오셔서 축복해주세요.<br></br>
              <div className="flex justify-center items-center my-4">
                <Image
                  src="/images/cross.png"
                  alt="Cross Image"
                  width={20}
                  height={20}
                  className="block"
                />
              </div>
              <span class="text-base">이영우</span>, <span class="text-base">신신숙</span>의 장남 <strong class="text-base">이성연</strong><br></br>
              <span class="text-base">김규백</span>, <span class="text-base">김영정</span>의 차녀 <strong class="text-base">김한은</strong>
            </h1>
          </div>
        </div>

        <div className="relative snap-center snap-always min-h-dvh w-full flex flex-col justify-center items-center bg-bgcolor-sky bg-cover bg-center">
          <h1 className="text-xl font-MapoGoldenPier text-custom-blue font-extralight">
            G A L L E R Y
          </h1>

          <div className="mt-12 max-h-7/10 overflow-y-auto grid grid-cols-2 grid-flow-row gap-1.5 mx-5 overscroll-auto">
            {images.map((image) => (
              <div key={image.fullSrc} className="">
                <Image
                  src={image.previewSrc}
                  alt={image.alt}
                  className="cursor-pointer object-cover aspect-square"
                  width={imageWidth}
                  height={imageWidth}
                  onClick={() => setSelectedImage(image.fullSrc)}
                />
              </div>
            ))}

            {/* Displaying the selected image */}
            {selectedImage && (
              <div className="max-h-dvh fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
                <div className="relative">
                  <Image
                    src={selectedImage}
                    alt="Selected"
                    className="object-contain p-5 max-h-dvh w-auto"
                    width={800}
                    height={800}
                    onClick={() => setSelectedImage(null)}
                  />
                  <button
                    className="absolute top-5 right-7 text-white text-2xl"
                    onClick={() => setSelectedImage(null)}
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* displaying the selected image */}
          {/* {selectedImage && (
            <div className="max-h-dvh fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
              <div className="relative">
                <Image
                  src={selectedImage}
                  alt="Selected"
                  className="object-contain p-5 max-h-dvh w-auto"
                  width={800}
                  height={800}
                  onClick={() => setSelectedImage(null)}
                />
                <button
                  className="absolute top-5 right-7 text-white text-2xl"
                  onClick={() => setSelectedImage(null)}
                >
                  &times;
                </button>
              </div>
            </div>
          )} */}
        </div>

        <div className="relative snap-center snap-always min-h-dvh min-w-full flex flex-col justify-center items-center bg-white">
          <div className="h-0.5/10/10 flex flex-col justify-center text-center">
            <h1 className="text-sm font-MapoGoldenPier text-custom-blue">L O C A T I O N</h1>
            <h1 className="text-xl font-MapoGoldenPier text-custom-blue">오시는 길</h1>
          </div>
          <div className="w-8/10 h-5/10 font-MapoGoldenPier text-gray-700 flex flex-col items-center justify-center leading-normal">
            <h1 className="text-center text-base font-bold">광명역사컨벤션웨딩홀</h1>
            <h2 className="mt-2 text-sm mx-10 text-wrap items-center flex flex-col text-center leading-6">
              경기도 광명시 광명역로 21<br></br>
              KTX광명역 동편 B1<br></br>
            </h2>

            {/* Map */}
            <div className="border mt-3 max-h-40 overscroll-none"
              id="map" style={{ width: '100%', maxWidth: 350, height: 200 }}>
            </div>

            {/* Map Buttons */}
            <div className="flex mt-3 space-x-4">
              <a
                href="https://map.naver.com/p/search/%EA%B4%91%EB%AA%85%EC%97%AD%EC%82%AC%EC%BB%A8%EB%B2%A4%EC%85%98%EC%9B%A8%EB%94%A9%ED%99%80?c=15.00,0,0,0,dh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-row flex items-center"
              >
                <Image
                  src="/images/naver.webp"
                  alt="네이버 지도"
                  width={30}
                  height={30}
                  className="rounded-lg"
                />
                <h2 className="text-xs ml-1 font-sans">네이버 지도</h2>
              </a>
              <a
                href="https://map.kakao.com/link/map/23753350"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-row flex items-center"
              >
                <Image
                  src="/images/kakao.svg"
                  alt="카카오맵"
                  width={30}
                  height={30}
                  className="rounded-lg"
                />
                <h2 className="text-xs ml-1 font-sans">카카오 지도</h2>
              </a>
            </div>
          </div>

          <div className="h-3/10 font-MapoGoldenPier text-xs text-wrap text-gray-700 leading-normal p-2">
            {/* subway */}
            <div className="flex items-start mb-4">
              <Image
                src="/images/subway.png"
                alt="subway"
                width={30}
                height={30}
                className="mr-2"
              />
              <div className="leading-5">
                <h1 className="text-custom-blue text-sm text-left leading-5">
                  지하철
                </h1>
                <p>1호선 광명역 지하철 운행 (영등포 - 광명역)</p>
                <p>1호선 관악역 1번 출구 (마을버스1-1 운행)</p>
              </div>
            </div>
            {/* bus */}
            <div className="flex items-start mb-4">
              <Image
                src="/images/bus.png"
                alt="bus"
                width={30}
                height={30}
                className="mr-2"
              />
              <div className="leading-5">
                <h1 className="text-custom-blue text-sm text-left leading-5">
                  주차 (2시간 무료)
                </h1>
                <p>광명 센트럴자이 상가 주차장 B3층</p>
                <p>광명 파크자이 오피스텔 주차장 B2층</p>
                <p className="text-custom-blue text-left text-sm leading-normal font-sans mt-2">
                  ※ 연회장 입구 직원분께 말씀해주시면<br />
                  무료주차 2시간 입력해드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative snap-center snap-always min-h-dvh min-w-full flex flex-col justify-center items-center bg-white bg-cover bg-center">
          <div className="h-1.5/10 w-full flex flex-col items-center justify-center">
            {/* <svg className="stroke-custom-blue size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg> */}

            <h1 className="mt-2 text-xl font-MapoGoldenPier text-custom-blue">
              참석여부 알리기
            </h1>

            <button
              onClick={() => window.open('https://forms.gle/S2SnGE7jT2SuxhF68', '_blank')}
              className="mt-2 w-8/10 p-1 flex items-center justify-center bg-button-blue rounded-lg relative"
            >
              <div className="p-1 font-MapoGoldenPier text-center text-gray-700">
                알리러 가기
              </div>
              <svg className="stroke-gray-700 size-4 absolute right-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>

          <div className=" mt-1/10 h-7/10 w-full font-MapoGoldenPier flex flex-col items-center">
            <div className="flex justify-center items-center">
              <Image
                src="/images/heart.png"
                alt="heart image"
                width={20}
                height={20}
                className="block"
              />
            </div>

            <h1 className="mt-2 text-xl text-custom-blue">
              마음 전하실 곳
            </h1>

            <div className="w-full mt-2 flex flex-col items-center text-xs">
              <div className="w-8/10 mb-4 border border-bgcolor-sky rounded-lg flex flex-col items-center">
                <button
                  onClick={() => setShowGroomAccounts(!showGroomAccounts)}
                  className="w-full p-2 flex items-center bg-button-blue rounded-lg"
                >
                  <div className="flex-grow text-base text-center text-gray-700">
                    신랑측 계좌번호
                  </div>
                  <svg className="stroke-1 stroke-gray-700 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {showGroomAccounts && (
                  <div className="text-gray-700 p-2 w-full font-NotoSansKR">
                    {/* 진짜 계좌번호: 카카오뱅크 3333-10-5382056 */}
                    <p className="flex justify-between items-center">
                      <span className="">카카오뱅크 0000-00-0000000<br></br>
                        이성연</span>
                      <button className="p-1 border rounded-md border-button-blue text-custom-blue" onClick={() => copyText("0000-00-0000000")}>
                        복사하기
                      </button>
                    </p>
                    <hr className="my-1 w-full border-bgcolor-sky" />
                    {/* 진짜 계좌번호: SC제일은행 600-20-373733 */}
                    <p className=" flex justify-between items-center">
                      <span>SC제일은행 000-00-000000<br></br>
                        이영우</span>
                      <button className="p-1 border rounded-md border-button-blue text-custom-blue" onClick={() => copyText("000-00-000000")}>
                        복사하기
                      </button>
                    </p>
                    <hr className="my-1 w-full border-bgcolor-sky" />
                    {/* 진짜 계좌번호: 국민은행 679802-93-115438 */}
                    <p className=" flex justify-between items-center">
                      <span>국민은행 000000-00-000000<br></br>
                        신신숙<br></br></span>
                      <button className="p-1 border rounded-md border-button-blue text-custom-blue" onClick={() => copyText("000000-00-000000")}>
                        복사하기
                      </button>
                    </p>
                  </div>
                )}
              </div>

              <div className="w-8/10 mb-4 border border-bgcolor-sky rounded-lg flex flex-col items-center">
                <button
                  onClick={() => setShowBrideAccounts(!showBrideAccounts)}
                  className="w-full flex items-center bg-button-blue rounded-lg p-2"
                >
                  <div className="flex-grow text-base text-center text-gray-700">
                    신부측 계좌번호
                  </div>
                  <svg className="stroke-1 stroke-gray-700 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {showBrideAccounts && (
                  <div className="text-gray-700 p-2 w-full font-NotoSansKR">
                    {/* 진짜 계좌번호: 카카오뱅크 3333-28-6191015 */}
                    <p className="flex justify-between items-center">
                      <span>카카오뱅크 0000-00-0000000<br></br>
                        김한은</span>
                      <button className="p-1 border rounded-md border-button-blue text-custom-blue" onClick={() => copyText("0000-00-0000000")}>
                        복사하기
                      </button>
                    </p>
                    <hr className="my-1 w-full border-bgcolor-sky" />
                    {/* 진짜 계좌번호: 농협 702076-52-131271 */}
                    <p className="flex justify-between items-center">
                      <span>농협 000000-00-000000<br></br>
                        김규백</span>
                      <button className="p-1 border rounded-md border-button-blue text-custom-blue" onClick={() => copyText("000000-00-000000")}>
                        복사하기
                      </button>
                    </p>
                    <hr className="my-1 w-full border-bgcolor-sky" />
                    {/* 진짜 계좌번호: 대구은행 009-08-312442 */}
                    <p className="flex justify-between items-center">
                      <span>대구은행 000-00-000000<br></br>
                        김영정</span>
                      <button className="p-1 border rounded-md border-button-blue text-custom-blue" onClick={() => copyText("000-00-000000")}>
                        복사하기
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <LivereComments />

      <div className="relative w-full">
        {/* image */}
        <Image
          src="/images/outro-01.png"
          alt="outro-01"
          width={1000}
          height={500}
          className="w-full"
        />

        {/* text */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <p className="text-sm md:text-base lg:text-lg xl:text-xl font-MapoGoldenPier font-extralight">
            저희의 첫 걸음을 축복해 주셔서 감사드리며<br />
            아름다운 가정을 꾸려나가겠습니다.
          </p>
        </div>
      </div>

      <div className="py-6 gap-2 flex flex-col justify-center bg-white">
        <button className="gap-2 flex flex-row justify-center items-center">
          <Image
            src="/images/kakao-icon.png"
            alt="kakao-icon"
            width={20}
            height={20}
            className=""
          />
          <h1 className="font-MapoGoldenPier text-gray-700"
            onClick={shareToKakao}>
            카카오톡 공유하기
          </h1>
        </button>

        <button className="gap-2 flex flex-row justify-center items-center">
          <Image
            src="/images/link-icon.png"
            alt="link-icon"
            width={20}
            height={20}
            className=""
          />
          <h1 className="font-MapoGoldenPier text-gray-700" onClick={() => copyText("https://lsy-khe.vercel.app/")}>
            링크주소 복사하기
          </h1>
        </button>
      </div>

      <footer className='relative py-1 flex flex-col items-center text-xs text-gray-700 bg-white'>
        <p className="">&copy; 2024 Joshua & Hannah. All rights reserved.</p>
      </footer>


      {/* Speaker Image */}
      <div className={`fixed right-3 top-3 z-auto ${animateBounce ? '' : ''}`}>
        {/* image exchange */}
        <button onClick={toggleMusic} className={`${animateBounce ? 'animate-bounce' : ''}`}>
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 stroke-custom-blue">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>

          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 stroke-custom-blue">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          )}
        </button>
      </div>

      {/* audio component */}
      <audio ref={audioRef} src="/music/In-your-heart[1.2].m4a" type="audio/mpeg" />

      {/* Optimized External Scripts */}
      <Script
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=tbpkc88r6x"
        strategy="lazyOnload"
        onLoad={createMap}
      />
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        crossOrigin="anonymous"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.Kakao) {
            window.Kakao.init('ae3cebdc03815c50b89b7721ec09778c');
          }
        }}
      />
    </main>
  );
}