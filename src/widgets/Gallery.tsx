import Image from "next/image";
import React from "react";
import chair3 from "@/assets/chair3.png"
import chair4 from "@/assets/chair4.png"
import chair1 from "@/assets/chair1.png"
import chair5 from "@/assets/chair5.png"

const ChairGallery: React.FC = () => {
  return (
    <div>
        <div className="grid sm:px-0  py-8 container mx-auto grid-cols-1 md:grid-cols-2 gap-3">

            <div>
                <Image src={chair3} alt="chair3" width={1200} height={1200}/>
            </div>
            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                    <Image src={chair4} alt="chair3" width={1200} height={1200}/>
                    </div>
                    <div>
                    <Image src={chair1} alt="chair1" width={1200} height={1200}/>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                <div>
                    <Image src={chair5} alt="chair5" className="rounded-md" width={1200} height={1200}/>
                    </div>
                    <div>
                    <Image src={chair1} alt="chair1" width={1200} height={1200}/>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  );
};

export default ChairGallery;
