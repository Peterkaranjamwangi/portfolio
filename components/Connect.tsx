// import React, { useRef } from "react";
// import emailjs from "@emailjs/browser";
// import SocialMedia from "./SocialMedia";

// const Connect = () => {
//   const form = useRef<HTMLFormElement>(null);
//   // const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();

//   //   if (form.current) {
//   //     emailjs
//   //       .sendForm(
//   //         "process.env.SERVICE_ID",
//   //         "process.env.TEMPLATE_ID",
//   //         form.current,
//   //         {
//   //           publicKey: "process.env.PUBLIC_KEY",
//   //         }
//   //       )
//   //       .then(
//   //         () => {
//   //           console.log("SUCCESS!");
//   //         },
//   //         (error) => {
//   //           console.log("FAILED...", error.text);
//   //         }
//   //       );
//   //   }
//   // };

//   const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (form.current) {
//       try {
//         const response = await emailjs.sendForm(
//           "process.env.SERVICE_ID",
//           "process.env.TEMPLATE_ID",
//           form.current,
//           {
//             publicKey: "process.env.PUBLIC_KEY",
//           }
//         );

//         console.log("SUCCESS!", response);
//       } catch (error) {
//         console.log("FAILED...", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <section className="mx-auto max-w-screen-md bg-gray-900 px-4 rounded-br-full rounded-tl-3xl py-8 border-green-500 border-y-2 border-r-2">
//         <SocialMedia />

//         <div className="grid rounded-2xl bg-gradient-to-r from-pink-500 via-gray-500 to-indigo-500 border-r-2 border-b-2 border-green-400 p-4 lg:col-span-3 lg:p-12">
//           <span className="relative flex justify-center">
//             <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

//             <span className="relative rounded-md z-10 bg-gray-800 px-3">
//               Send me a message
//             </span>
//           </span>

//           <p className="pb-5 justify-self-center text-xl"></p>
// <form
//   ref={form}
//   onSubmit={sendEmail}
//   className="space-y-4 text-black"
// >
//   <div>
//     <label className="sr-only border" htmlFor="name">
//       Name
//     </label>
//     <input
//       className="w-full rounded-lg border-gray-200 p-3 text-sm"
//       placeholder="Name"
//       type="text"
//       id="name"
//       name="user_name"
//     />
//   </div>

//   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//     <div>
//       <label className="sr-only" htmlFor="email">
//         Email
//       </label>
//       <input
//         className="w-full rounded-lg border-gray-200 p-3 text-sm"
//         placeholder="Email address"
//         type="email"
//         id="email"
//         name="user_email"
//       />
//     </div>

//     <div>
//       <label className="sr-only" htmlFor="phone">
//         Phone
//       </label>
//       <input
//         className="w-full rounded-lg border-gray-200 p-3 text-sm"
//         placeholder="Phone Number"
//         type="tel"
//         id="phone"
//         name="user_phone"
//       />
//     </div>
//   </div>

//   <div>
//     <label className="sr-only" htmlFor="message">
//       Message
//     </label>

//     <textarea
//       className="w-full rounded-lg border-gray-200 p-3 text-sm"
//       placeholder="Message"
//       id="message"
//       name="message"
//     ></textarea>
//   </div>

//   <div className="mt-3 flex flex-1 justify-center">
//     <button
//       type="submit"
//       value="Send"
//       className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
//     >
//       Send Message
//     </button>
//   </div>

//   <input type="submit" value="Send" />
// </form>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Connect;

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SocialMedia from "./SocialMedia";

const Connect = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      try {
        const response = await emailjs.sendForm(
          "process.env.SERVICE_ID",
          "process.env.TEMPLATE_ID",
          form.current,
          {
            publicKey: "process.env.PUBLIC_KEY",
          }
        );

        console.log("SUCCESS!", response);
        setIsSuccess(true);
        resetForm();
      } catch (error) {
        console.log("FAILED...", error);
        setIsSuccess(false);
        setErrorMessage("Please check your details and try again.");
      }
    }
  };

  const resetForm = () => {
    if (form.current) {
      form.current.reset();
    }
  };

  return (
    <div>
      <section className="mx-auto max-w-screen-md bg-gray-900 px-4 rounded-br-full rounded-tl-3xl py-8 border-green-500 border-y-2 border-r-2">
        <SocialMedia />

        <form ref={form} onSubmit={sendEmail} className="space-y-4 text-black">
          <div>
            <label className="sr-only border" htmlFor="name">
              Name
            </label>
            <input
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Name"
              type="text"
              id="name"
              name="user_name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Email address"
                type="email"
                id="email"
                name="user_email"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="phone">
                Phone
              </label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Phone Number"
                type="tel"
                id="phone"
                name="user_phone"
              />
            </div>
          </div>

          <div>
            <label className="sr-only" htmlFor="message">
              Message
            </label>

            <textarea
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Message"
              id="message"
              name="message"
            ></textarea>
          </div>

          <div className="mt-3 flex flex-1 justify-center">
            <button
              type="submit"
              value="Send"
              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              Send Message
            </button>
          </div>

          <input type="submit" value="Send" />
        </form>

        <Popup
          open={isSuccess !== null || errorMessage !== null}
          onClose={() => {
            setIsSuccess(null);
            setErrorMessage(null);
          }}
        >
          {isSuccess !== null ? (
            isSuccess ? (
              <div className="p-4 bg-green-200 text-green-800">
                Email sent successfully!
              </div>
            ) : (
              <div className="p-4 bg-red-200 text-red-800">{errorMessage}</div>
            )
          ) : null}
        </Popup>
      </section>
    </div>
  );
};

export default Connect;
