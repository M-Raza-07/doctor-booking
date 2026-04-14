import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext, useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useAppContext(AppContext);
  const daysOfWeek: string[] = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ];

  const [docInfo, setDocInfo] = useState<Doctor | null>(null);
  const [docSlots, setDocSlots] = useState<TimeSlot[][]>([]);
  const [slotIndex, setSlotIndex] = useState<number>(-1);
  const [slotTime, setSlotTime] = useState<string>("");

  interface TimeSlot {
    dateTime: Date;
    time: string;
  }

  // Example — adjust fields to match your actual data
  interface Doctor {
    _id: string;
    name: string;
    slots?: TimeSlot[][];
    image: string;
    speciality: string;
    degree: string;
    experience: string;
    about: string;
    fees: number;
    address: {
      line1: string;
      line2: string;
    };
    // ...other fields
  }

  const fetchDoctorsInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo ?? null);
  };

  const getAvailableSlots = async () => {
    setDocSlots(docInfo?.slots || []);

    // getting current date
    const today: Date = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      const currentDate: Date = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the day with index
      const endTime: Date = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timesSlots: TimeSlot[] = [];

      while (currentDate < endTime) {
        const formatedTime: string = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        // add slot to array
        timesSlots.push({
          dateTime: new Date(currentDate),
          time: formatedTime,
        });

        // increasing 30 mins to current time
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timesSlots]);
    }
  };

  useEffect(() => {
    fetchDoctorsInfo();
    console.log(doctors);
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);
  return (
    docInfo && (
      <div>
        {/* ------------------------ Doctor details --------------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary-color w-full sm:max-w-72 rounded-lg"
              src={docInfo?.image}
              alt="docInfo"
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-10 py-7 bg-white mx-2 sm:mx-0 mt-[-80] sm:mt-0">
            {/* ---------- -Doc Info: name, degree, experience --------------  */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* Doctor about */}
            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-175 mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:
              <span className="text-gray-600 ml-2">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* --------------------------------- Booking Slots ---------------------------------------------- */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div>
            {docSlots.length &&
              docSlots.map((slots, index) => (
                <div key={index}>
                  <p>{slots[0] && daysOfWeek[slots[0].dateTime.getDay()]}</p>
                  <p>{slots[0] && slots[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
