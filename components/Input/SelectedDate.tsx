import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import Select from "react-select";
import { Dialog, Transition } from "@headlessui/react";

const SelectedDate: React.FC<any> = ({
  showDatesPanel,
  setShowDatesPanel,
  input,
  setInput,
}) => {
  const monthOptions = [
    { value: "January", label: "January" },
    { value: "Februray", label: "Februray" },
    { value: "March", label: "March" },
    { value: "April", label: "March" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
  ];
  const dayOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
  ];
  const yearOptions = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
  ];
  const hourOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];
  const minuteOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];
  const ampmOptions = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" },
  ];

  const [selectedMonthOption, setSelectedMonthOption] = useState<{
    value: string;
    label: string;
  } | null>({ value: "January", label: "January" });
  const [selectedDayOption, setSelectedDayOption] = useState<{
    value: string;
    label: string;
  } | null>({ value: "1", label: "1" });
  const [selectedYearOption, setSelectedYearOption] = useState<{
    value: string;
    label: string;
  } | null>({ value: "2023", label: "2023" });
  const [selectedHourOption, setSelectedHourOption] = useState<{
    value: string;
    label: string;
  } | null>({ value: "1", label: "1" });
  const [selectedMinuteOption, setSelectedMinuteOption] = useState<{
    value: string;
    label: string;
  } | null>({ value: "1", label: "1" });
  const [selectedAMPMOption, setSelectedAMPMOption] = useState<{
    value: string;
    label: string;
  } | null>({ value: "AM", label: "AM" });
  return (
    <Transition.Root show={showDatesPanel} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-30 inset-0 pt-8"
        onClose={setShowDatesPanel}
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
          <div className="z-30 text-white p-3 py-1 rounded-xl bg-black/95 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -ml-16 w-[36%] text-left">
            <div className="flex justify-between w-full pt-2">
              <div className="flex items-center w-2/6 justify-between">
                <span className="p-1 cursor-pointer hover:bg-gray-800 rounded-full">
                  <XMarkIcon
                    height={24}
                    onClick={() => setShowDatesPanel(false)}
                    className="z-50"
                  />
                </span>
                <span className="font-extrabold text-lg">Schedule</span>
              </div>
              <button
                onClick={() => {
                  setInput(
                    input +
                      ` ${selectedYearOption?.value}-${selectedMonthOption?.value}-${selectedDayOption?.value}`
                  );
                  setShowDatesPanel(false);
                }}
                className="bg-white text-black py-2 px-5 font-bold rounded-full"
              >
                Confirm
              </button>
            </div>
            <div className="flex py-2 items-center">
              <CalendarIcon height={20} className="z-50" />
              <span>
                &nbsp;Will send on {selectedDayOption?.value},{" "}
                {selectedMonthOption?.value.slice(0, 3)},{" "}
                {selectedYearOption?.value} at {selectedHourOption?.value}:
                {selectedMinuteOption?.value}
                {selectedAMPMOption?.value}
              </span>
            </div>
            <div>
              <p>Date</p>
              <div className="flex justify-between mt-5">
                <div className="relative">
                  <span className="absolute -top-5 left-0 z-10 text-gray-500 text-sm">
                    Month
                  </span>
                  <Select
                    styles={{
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "white",
                      }),
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "200px",
                        backgroundColor: state.isFocused ? "#222" : "black",
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused ? "#222" : "black",
                      }),
                      container: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused ? "#222" : "black",
                      }),
                    }}
                    defaultValue={selectedMonthOption}
                    onChange={setSelectedMonthOption}
                    options={monthOptions}
                  />
                </div>
                <div className="relative">
                  <span className="absolute -top-5 left-0 z-10 text-gray-500 text-sm">
                    Day
                  </span>
                  <Select
                    styles={{
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "white",
                      }),
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "110px",
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
                    Year
                  </span>
                  <Select
                    styles={{
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "white",
                      }),
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "110px",
                        backgroundColor: state.isFocused ? "#222" : "black",
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused ? "#222" : "black",
                      }),
                    }}
                    defaultValue={selectedYearOption}
                    onChange={setSelectedYearOption}
                    options={yearOptions}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p>Time</p>
              <div className="flex justify-between mt-5">
                <div className="relative">
                  <span className="absolute -top-5 left-0 z-10 text-gray-500 text-sm">
                    Hour
                  </span>
                  <Select
                    styles={{
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "white",
                      }),
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "137px",
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
                    Minute
                  </span>
                  <Select
                    styles={{
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "white",
                      }),
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "137px",
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
                <div className="relative">
                  <span className="absolute -top-5 left-0 z-10 text-gray-500 text-sm">
                    AM/PM
                  </span>
                  <Select
                    styles={{
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "white",
                      }),
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "137px",
                        backgroundColor: state.isFocused ? "#222" : "black",
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused ? "#222" : "black",
                      }),
                    }}
                    defaultValue={selectedAMPMOption}
                    onChange={setSelectedAMPMOption}
                    options={ampmOptions}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm -mb-1">Time Zone</p>
              <p className="text-lg">Afghanistan Time</p>
            </div>
            <hr className="mt-4 text-gray-500" />
            <p className="text-sky-400 my-2 cursor-pointer font-bold text-sm">
              Schedule Tweets
            </p>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SelectedDate;
