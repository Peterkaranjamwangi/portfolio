import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SocialMedia from "./SocialMedia";

const Connect = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setErrorMessage(null);

  //   if (form.current) {
  //     const name = form.current.elements.namedItem(
  //       "user_name"
  //     ) as HTMLInputElement;
  //     const email = form.current.elements.namedItem(
  //       "user_email"
  //     ) as HTMLInputElement;
  //     const message = form.current.elements.namedItem(
  //       "message"
  //     ) as HTMLInputElement;

  //     const errors: string[] = [];

  //     if (!name.value.trim()) {
  //       errors.push("Name is required.");
  //     }

  //     if (!email.value.trim()) {
  //       errors.push("Email is required.");
  //     } else if (!isValidEmail(email.value)) {
  //       errors.push("Please enter a valid email address.");
  //     }

  //     if (!message.value.trim()) {
  //       errors.push("Message is required.");
  //     }

  //     if (errors.length > 0) {
  //       setErrorMessage(errors.join(" "));
  //       return;
  //     }

  //     try {
  //       const response = await emailjs.sendForm(
  //         "service_u1d",
  //         "template_6cvyhb8",
  //         form.current,
  //         {
  //           publicKey: "HNFmC88dJWLKMw9PP",
  //         }
  //       );

  //       console.log("SUCCESS!", response);
  //       setIsSuccess(true);
  //       resetForm();
  //       setTimeout(() => {
  //         setIsSuccess(null);
  //       }, 1000);
  //     } catch (error) {
  //       console.log("FAILED...", error);
  //       setErrorMessage("Please check your details and try again.");
  //     }
  //   }
  // };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (form.current) {
      const name = form.current.elements.namedItem(
        "user_name"
      ) as HTMLInputElement;
      const email = form.current.elements.namedItem(
        "user_email"
      ) as HTMLInputElement;
      const message = form.current.elements.namedItem(
        "message"
      ) as HTMLInputElement;

      const errors: string[] = [];

      if (!name.value.trim()) {
        errors.push("Name is required.");
      }

      if (!email.value.trim()) {
        errors.push("Email is required.");
      } else if (!isValidEmail(email.value)) {
        errors.push("Please enter a valid email address.");
      }

      if (!message.value.trim()) {
        errors.push("Message is required.");
      }

      if (errors.length > 0) {
        setErrorMessage(errors.join(" "));
        return;
      }

      try {
        const response = await emailjs.sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE_ID?.trim() ?? "",
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID?.trim() ?? "",
          form.current,
          {
            publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY?.trim() ?? "",
          }
        );

        // try {
        //   const response = await emailjs.sendForm(
        //     "service_u1d",
        //     "template_6cvyhb8",
        //     form.current,
        //     {
        //       publicKey: "HNFmC88dJWLKMw9PP",
        //     }
        //   );

        console.log("SUCCESS!", response);
        setIsSuccess(true);
        resetForm();
        setTimeout(() => {
          setIsSuccess(null);
        }, 1000);
      } catch (error) {
        console.log("FAILED...", error);
        setErrorMessage("Please check your details and try again.");
      }
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

        <div className="grid rounded-2xl bg-gradient-to-r from-pink-500 via-gray-500 to-indigo-500 border-r-2 border-b-2 border-green-400 p-4 lg:col-span-3 lg:p-12">
          <span className="relative flex justify-center my-2 md:my-4">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
            <span className="relative rounded-md z-10 bg-gray-800 px-3">
              Send me a message
            </span>
          </span>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="space-y-4 text-black "
          >
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

            <div className=" mt-40 flex flex-1 justify-center">
              <button
                type="submit"
                value="Send"
                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
              >
                Send Message
              </button>
            </div>
          </form>

          {isSuccess !== null && isSuccess && (
            <Popup open onClose={() => setIsSuccess(null)}>
              <div className="p-4 bg-green-200 text-green-800">
                Email sent successfully!
              </div>
            </Popup>
          )}

          {errorMessage && (
            <div className="p-4 bg-red-900 text-gray-800">{errorMessage}</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Connect;

// import React, { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
// import SocialMedia from "./SocialMedia";

// const Connect = () => {
//   const form = useRef<HTMLFormElement>(null);
//   const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const isValidEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (form.current) {
//       const name = form.current.elements.namedItem(
//         "user_name"
//       ) as HTMLInputElement;
//       const email = form.current.elements.namedItem(
//         "user_email"
//       ) as HTMLInputElement;
//       const message = form.current.elements.namedItem(
//         "message"
//       ) as HTMLInputElement;

//       const errors: string[] = [];

//       if (!name.value) {
//         errors.push("Name is required.");
//       }

//       if (!email.value) {
//         errors.push("Email is required.");
//       } else if (!isValidEmail(email.value)) {
//         errors.push("Please enter a valid email address.");
//       }

//       if (!message.value) {
//         errors.push("Message is required.");
//       }

//       name.setCustomValidity(
//         errors.includes("Name is required.") && !name.value
//           ? "Name is required."
//           : ""
//       );
//       email.setCustomValidity(
//         errors.includes("Email is required.") && !email.value
//           ? "Email is required."
//           : ""
//       );
//       message.setCustomValidity(
//         errors.includes("Message is required.") && !message.value
//           ? "Message is required."
//           : ""
//       );

//       if (errors.length > 0) {
//         setErrorMessage(errors.join(" "));
//         return;
//       }

// try {
//   const response = await emailjs.sendForm(
//     "service_u1d",
//     "template_6cvyhb8",
//     form.current,
//     {
//       publicKey: "HNFmC88dJWLKMw9PP",
//     }
//   );

//         console.log("SUCCESS!", response);
//         setIsSuccess(true);
//         resetForm();
//       } catch (error) {
//         console.log("FAILED...", error);
//         setIsSuccess(false);
//         setErrorMessage("Please check your details and try again.");
//       }
//     }
//   };

//   const resetForm = () => {
//     if (form.current) {
//       form.current.reset();
//     }
//   };

//   return (
//     <div>
//       <section className="mx-auto max-w-screen-md bg-gray-900 px-4 rounded-br-full rounded-tl-3xl py-8 border-green-500 border-y-2 border-r-2">
//         <SocialMedia />

//         <div className="grid rounded-2xl bg-gradient-to-r from-pink-500 via-gray-500 to-indigo-500 border-r-2 border-b-2 border-green-400 p-4 lg:col-span-3 lg:p-12">
//           <span className="relative flex justify-center my-2 md:my-4">
//             <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
//             <span className="relative rounded-md z-10 bg-gray-800 px-3">
//               Send me a message
//             </span>
//           </span>
//           <form
//             ref={form}
//             onSubmit={sendEmail}
//             className="space-y-4 text-black"
//           >
//             <div>
//               <label className="sr-only border" htmlFor="name">
//                 Name
//               </label>
//               <input
//                 className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                 placeholder="Name"
//                 type="text"
//                 id="name"
//                 name="user_name"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <label className="sr-only" htmlFor="email">
//                   Email
//                 </label>
//                 <input
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                   placeholder="Email address"
//                   type="email"
//                   id="email"
//                   name="user_email"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="sr-only" htmlFor="phone">
//                   Phone
//                 </label>
//                 <input
//                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                   placeholder="Phone Number"
//                   type="tel"
//                   id="phone"
//                   name="user_phone"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="sr-only" htmlFor="message">
//                 Message
//               </label>

//               <textarea
//                 className="w-full rounded-lg border-gray-200 p-3 text-sm"
//                 placeholder="Message"
//                 id="message"
//                 name="message"
//                 required
//               ></textarea>
//             </div>

//             <div className="mt-3 flex flex-1 justify-center">
//               <button
//                 type="submit"
//                 value="Send"
//                 className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
//               >
//                 Send Message
//               </button>
//             </div>
//           </form>

//           <Popup
//             open={isSuccess !== null || errorMessage !== null}
//             onClose={() => {
//               setIsSuccess(null);
//               setErrorMessage(null);
//             }}
//           >
//             {isSuccess !== null ? (
//               isSuccess ? (
//                 <div className="p-4 bg-green-200 text-green-800">
//                   Email sent successfully!
//                 </div>
//               ) : (
//                 <div className="p-4 bg-red-200 text-red-800">
//                   {errorMessage || "Error, please try again"}
//                 </div>
//               )
//             ) : null}
//           </Popup>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Connect;
