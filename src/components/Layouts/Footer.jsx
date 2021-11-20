import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
const Footer = ({ history }) => {
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="p-10 mx-auto" style={{ maxWidth: "1336px" }}>
          <div className="flex w-full">
            <div className="w-1/3">
              <p>sparta</p>
            </div>
            <div className="flex justify-between w-2/3">
              <div>
                <p className="font-bold text-xl text-gray-200 uppercase">
                  Платформ
                </p>
                <div className="text-gray-500 pt-6">
                  <a href="/">
                    <p className="hover:underline text-lg mb-3">Веб хуудас</p>
                  </a>
                  <a href="facebook.com">
                    <p className="hover:underline text-lg">Төлбөрийн нөхцөл</p>
                  </a>
                </div>
              </div>
              <div>
                <p className="font-bold text-xl text-gray-200 uppercase">
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
                <p className="font-bold text-xl text-gray-200 uppercase">
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
                <p className="font-bold text-xl text-gray-200 uppercase">
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
