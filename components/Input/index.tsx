import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  GifIcon,
  MapPinIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FunctionComponent, useRef, useState } from "react";
import { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import Picker from "emoji-picker-react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { db, storage } from "../../utils/firebase";
import { useSession } from "next-auth/react";
import { changedSessionType } from "../../utils/typings";
import SelectedDate from "./SelectedDate";
import PollModel from "./Poll";

const Input: FunctionComponent = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef<any>(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showDatesPanel, setShowDatesPanel] = useState(false);
  const [showPollPanel, setShowPollPanel] = useState(false);

  const {
    data: session,
  }: {
    data: null | changedSessionType;
    status: "loading" | "authenticated" | "unauthenticated";
  } = useSession();

  const addImageToPost = (e: any) => {
    const reader = new FileReader();
    // FileReader Lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects
    if (e.target.files[0]) {
      // e.target.files[0] is d blob
      reader.readAsDataURL(e.target.files[0]);
    }

    // getting d event & setting it as selectedFile
    reader.onload = (readerEvent: any) =>
      setSelectedFile(readerEvent?.target.result);
  };

  // sendPost to firebase/firestore & store img to firebase/storage
  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // addDoc: add new document to collection of 'posts' & d data inside document will be {text, timestamp} // 'posts' collection will be in db.
      const docRef = await addDoc(collection(db, "posts"), {
        id: session?.user?.uid as string,
        username: session?.user?.name as string,
        userImg: session?.user?.image as string,
        tag: session?.user?.tag as string,
        text: input,
        timestamp: serverTimestamp(), // return timestamp value
      });

      // ref from firebase/storage return a storage refrence for the given url(d url of file inside storage)
      const imageRef = ref(storage, `posts/${docRef.id}/image`);

      if (selectedFile) {
        // Uploads a string/value to this object's-location/ref. // return a Promise containing an UploadResult
        await uploadString(imageRef, selectedFile, "data_url").then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef); // Returns the download URL for the given StorageReference.
            // updateDoc Updates fields in the document referred to by the specified DocumentReference.
            // doc Gets a DocumentReference instance that refers to the document at the specified absolute path.
            await updateDoc(doc(db, "posts", docRef.id), {
              image: downloadURL,
            });
          }
        );
      }
    } catch (error) {
      if (error instanceof Error) alert("Error! " + error.message);
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };

  // divide-y added border top & bottom for each elem in container.
  return (
    <div
      className={`flex space-x-3 overflow-y-scroll border-b border-gray-700 p-3 scrollbar-hide ${
        loading && "opacity-60"
      }`}
    >
      <img
        src={session?.user?.image || "images/people(1).png"}
        alt=""
        className="h-11 w-11 cursor-pointer rounded-full"
        onClick={() => {}}
      />
      <div className="w-full pb-1 divide-gray-700">
        <div className={` ${input && "space-y-2.5"}`}>
          <textarea
            onClick={() => setShowEmojis(false)}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            rows={2}
            className="min-h-[50px] w-full bg-transparent text-lg tracking-wide text-[#d9d9d9] placeholder-gray-500 outline-none"
          />

          {selectedFile && (
            <div className="relative">
              <div
                className="absolute top-1 left-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#15181c] bg-opacity-75 hover:bg-[#272c26]"
                onClick={() => setSelectedFile(null)}
              >
                <XMarkIcon className="h-5 text-white" />
              </div>
              <img src={selectedFile} alt="" className="max-h-80 rounded-2xl" />
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon relative group"
                onClick={() => filePickerRef.current?.click()}
              >
                <PhotoIcon className="h-[22px] text-[#1d9bf0]" />
                <input
                  type="file"
                  ref={filePickerRef}
                  onClick={() => setShowEmojis(false)}
                  hidden
                  onChange={addImageToPost}
                />
                <span className="absolute top-8 z-50 scale-0 rounded bg-gray-800 px-1 py-[0.5px] text-xs text-white group-hover:scale-100">
                  Photo
                </span>
              </div>

              <div
                className="icon relative group"
                onClick={() => setShowEmojis(false)}
              >
                <GifIcon className="h-[22px] text-[#1d9bf0]" />
                <span className="absolute top-8 z-50 scale-0 rounded bg-gray-800 px-1 py-[0.5px] text-xs text-white group-hover:scale-100">
                  Gif
                </span>
              </div>

              <div // couldn't find poll-icon
                className="icon relative group"
                onClick={() => {
                  setShowEmojis(false);
                  setShowPollPanel(!showPollPanel);
                }}
              >
                <ChartBarIcon className="h-[22px] rotate-90 text-[#1d9bf0]" />
                <span className="absolute top-8 z-50 scale-0 rounded bg-gray-800 px-1 py-[0.5px] text-xs text-white group-hover:scale-100">
                  Poll
                </span>
              </div>

              <div
                className="icon relative group"
                onClick={() => setShowEmojis(!showEmojis)}
              >
                <FaceSmileIcon className="h-[22px] text-[#1d9bf0]" />
                <span className="absolute top-8 z-50 scale-0 rounded bg-gray-800 px-1 py-[0.5px] text-xs text-white group-hover:scale-100">
                  Emoji
                </span>
              </div>

              {showEmojis && (
                <div className="absolute mt-[475px] -ml-10 max-w-xs rounded-2xl">
                  <Picker
                    onEmojiClick={(
                      emojiObject: EmojiClickData,
                      event: MouseEvent
                    ): void => {
                      setInput(input + emojiObject?.emoji);
                    }}
                    emojiStyle={EmojiStyle.TWITTER}
                  />
                </div>
              )}

              {showDatesPanel && (
                <SelectedDate
                  showDatesPanel={showDatesPanel}
                  setShowDatesPanel={setShowDatesPanel}
                  setInput={setInput}
                  input={input}
                />
              )}

              {showPollPanel && (
                <div className="bg-[#1d9bf0]">
                  <PollModel
                    showPollPanel={showPollPanel}
                    setShowPollPanel={setShowPollPanel}
                  />
                </div>
              )}

              <div
                className="icon relative group"
                onClick={() => {
                  setShowEmojis(false);
                  setShowDatesPanel(!showDatesPanel);
                }}
              >
                <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
                <span className="absolute top-8 z-50 scale-0 rounded bg-gray-800 px-1 py-[0.5px] text-xs text-white group-hover:scale-100">
                  Schedule
                </span>
              </div>

              <div
                className="icon cursor-auto group relative"
                onClick={() => setShowEmojis(false)}
              >
                <MapPinIcon className="h-[22px] text-[#1d9bf0] opacity-60" />
                <span className="absolute top-8 z-50 scale-0 rounded bg-gray-800 px-1 py-[0.5px] text-xs text-white group-hover:scale-100">
                  Location
                </span>
              </div>
            </div>

            <button
              className="rounded-full bg-[#1d9bf0] px-4 py-1.5 font-bold text-white shadow-md hover:bg-[#1a8cd8] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-[#1d9bf0]"
              disabled={!input && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
