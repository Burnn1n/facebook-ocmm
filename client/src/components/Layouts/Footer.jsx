import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
const Footer = ({ history }) => {
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="p-10 mx-auto" style={{ maxWidth: "1336px" }}>
          <div className="flex w-full flex-wrap">
            <div className="w-1/3 sm:w-full">
              <div className="flex text-center items-center mb-4">
                <img
                  src="https://www.nicepng.com/png/full/177-1772556_logo-no-background-grey-large-cool-logos-with.png"
                  alt=""
                  className="w-20 h-20 object-cover"
                />
                <span className="font-bold text-2xl text-blue-600">Sparta</span>
              </div>

              <p className="font-medium text-gray-900">
                Таны Facebook-ын бүх сэтгэгдлүүд, удирдахад хялбар мэдээллийн
                нэг дор.
              </p>
            </div>
            <div className="flex justify-between w-2/3 sm:w-full flex-wrap">
              <div>
                <p className="font-bold text-xl sm:text-base text-gray-300 uppercase">
                  Платформ
                </p>
                <div className="text-gray-500 pt-6">
                  <a href="/">
                    <p className="hover:underline text-lg mb-3">Веб хуудас</p>
                  </a>
                  <a href="/tulbur">
                    <p className="hover:underline text-lg">Төлбөрийн нөхцөл</p>
                  </a>
                </div>
              </div>
              <div>
                <p className="font-bold text-xl sm:text-base text-gray-300 uppercase">
                  RESOURCES
                </p>
                <div className="text-gray-500 pt-6">
                  <a href="https://developers.facebook.com/">
                    <p className="hover:underline text-lg mb-3">
                      Тусламжийн төв
                    </p>
                  </a>
                </div>
              </div>
              <div>
                <p className="font-bold text-xl sm:text-base text-gray-300 uppercase">
                  Холбоо барих
                </p>
                <div className="text-gray-500 pt-6">
                  <a href="facebook.com">
                    <p className="hover:underline text-lg mb-3">Тусламж</p>
                  </a>
                  <a href="facebook.com">
                    <p className="hover:underline text-lg mb-3">
                      Төлбөрийн нөхцөл
                    </p>
                  </a>
                  <a href="facebook.com">
                    <p className="hover:underline text-lg">Хамтран ажиллах</p>
                  </a>
                </div>
              </div>
              <div>
                <p className="font-bold text-xl sm:text-base text-gray-300 uppercase">
                  Хууль зүй
                </p>
                <div className="text-gray-500 pt-6">
                  <a href="https://www.iubenda.com/terms-and-conditions/36646629">
                    <p className="hover:underline text-lg mb-3">
                      Үйлчилгээний нөхцөл
                    </p>
                  </a>
                  <a href="https://www.iubenda.com/privacy-policy/36646629">
                    <p className="hover:underline text-lg">
                      Хувийн нууцлал ба бодлого{" "}
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
