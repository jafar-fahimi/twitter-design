import Select from "react-select";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GlobeEuropeAfricaIcon, PlusIcon } from "@heroicons/react/24/outline";

const PollModel: React.FC<{
  showPollPanel: boolean;
  setShowPollPanel: Dispatch<SetStateAction<boolean>>;
}> = ({ showPollPanel, setShowPollPanel }) => {
  const [pollQuestion, setPollQuestion] = useState("");
  const hourOptions = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];
  const minuteOptions = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];
  const dayOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
  ];
  const [selectedDayOption, setSelectedDayOption] = useState<{
    value: string;
    label: string;
  } | null>({ value: "1", label: "1" });
  const [selectedHourOption, setSelectedHourOption] = useState<{
    value: string;
    label: string;
  } | null>({ value: "0", label: "0" });
  const [selectedMinuteOption, setSelectedMinuteOption] = useState<{
    value: string;
    label: string;
  } | null>({ value: "0", label: "0" });

  return (
    <Transition.Root show={showPollPanel} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-30 inset-0 pt-8"
        onClose={setShowPollPanel}
      >
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>
          <div className="z-30 text-white py-1 rounded-xl bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -ml-16 w-[36%] text-left">
            <div className="absolute tope-0 left-1 p-1">
              <select
                className="bg-black text-[#1d9bf0] border-2 border-[#1d9bf0] ring-0 outline-none rounded-full text-sm font-bold py-[1px] px-2"
                name="whotosee"
                id="whotosee"
              >
                <option value="everyone">Everyone</option>
                <option value="contacts">Contacts</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="mt-12 mb-2 px-4 text-lg">
              <input
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                type="text"
                placeholder="Ask a question..."
                className="outline-0 bg-black text-gray-300 placeholder-gray-500"
              />
            </div>
            <div className="border-2 m-3 mb-1 rounded-lg border-gray-500 space-y-2">
              <div className="p-3 space-y-4">
                <input
                  type="text"
                  placeholder="Choice 1"
                  className="bg-black text-gray-100 w-11/12 p-2 outline-none outline-gray-300 focus:outline-[#1d9bf0] hover:outline-[#1d9bf0] rounded-sm"
                />
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Choice 2"
                    className="bg-black text-gray-100 w-11/12 p-2 outline-none outline-gray-300 focus:outline-[#1d9bf0] rounded-sm hover:outline-[#1d9bf0]"
                  />
                  <PlusIcon className="w-6 h-6 text-[#1d9bf0] font-bold hover:text-blue-700" />
                </div>
              </div>
              <div className="w-full border-t-2 border-gray-400">
                <div className="p-2">
                  <span className="text-sm text-white">Poll Length</span>
                  <div className="flex justify-between mt-5">
                    <div className="relative">
                      <span className="absolute -top-5 left-0 z-10 text-gray-500 text-sm">
                        Days
                      </span>
                      <Select
                        styles={{
                          singleValue: (provided, state) => ({
                            ...provided,
                            color: "white",
                          }),
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            width: "130px",
                            backgroundColor: state.isFocused ? "#222" : "black",
                          }),
                          option: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: state.isFocused ? "#222" : "black",
                          }),
                        }}
                        defaultValue={selectedDayOption}
                        onChange={setSelectedDayOption}
                        options={dayOptions}
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute -top-5 left-0 z-10 text-gray-500 text-sm">
                        Hours
                      </span>
                      <Select
                        styles={{
                          singleValue: (provided, state) => ({
                            ...provided,
                            color: "white",
                          }),
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            width: "130px",
                            backgroundColor: state.isFocused ? "#222" : "black",
                          }),
                          option: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: state.isFocused ? "#222" : "black",
                          }),
                        }}
                        defaultValue={selectedHourOption}
                        onChange={setSelectedHourOption}
                        options={hourOptions}
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute -top-5 left-0 z-10 text-gray-500 text-sm">
                        Minutes
                      </span>
                      <Select
                        styles={{
                          singleValue: (provided, state) => ({
                            ...provided,
                            color: "white",
                          }),
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            width: "130px",
                            backgroundColor: state.isFocused ? "#222" : "black",
                          }),
                          option: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: state.isFocused ? "#222" : "black",
                          }),
                        }}
                        defaultValue={selectedMinuteOption}
                        onChange={setSelectedMinuteOption}
                        options={minuteOptions}
                      />
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setShowPollPanel(false)}
                  className="py-3 cursor-pointer hover:bg-red-500/20 text-red-500 text-center border-t-2 border-gray-400 mt-2"
                >
                  Remove Poll
                </div>
              </div>
            </div>
            <div className="px-6 text-xs font-bold text-[#41b3ff] pb-2 flex items-center cursor-pointer">
              <GlobeEuropeAfricaIcon
                height={16}
                className="text-[#1d9bf0] pr-1"
              />
              <span>Everyone can replay</span>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PollModel;
