'use client'
import React from 'react';
import Image from 'next/image';

type HeaderProps = {
  pageName: string;
};

export default function Header({ pageName }: HeaderProps) {
  return (
    <div>
      <div className="w-full h-[107px] p-5 mx-auto bg-white rounded-2xl text-black">
        <div className="flex flex-row w-full justify-between">
          <p className="font-bold text-2xl mt-5"> {pageName}</p>

          <div className="flex gap-14 justify-end">
            <div className="bg-[#FF6B6B] flex w-[255px] h-[50px] rounded-full">
              <div className="flex items-center px-2">
                <Image src="/magnifying-glass 1.png" width={20} height={20} alt="search" />
              </div>
              <input type="text" className="focus:outline-0 bg-[#FF6B6B] text-white placeholder-white" placeholder="Search..." />
            </div>
            <button>
              <div>
                <Image src="/002-notification-1.png" width={30} height={30} alt="notification" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
