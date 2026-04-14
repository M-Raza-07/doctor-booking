import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();

  const { doctors } = useAppContext();
  const [filteredDoctors, setFilterDoc] = useState<Doctors[]>([]);
  const navigateToDoctorProfile = useNavigate();

  type DoctorSpeciality = {
    id: number;
    name: string;
  };

  const doctorSpecialities: DoctorSpeciality[] = [
    { id: 1, name: "General physician" },
    { id: 2, name: "Gynecologist" },
    { id: 3, name: "Dermatologist" },
    { id: 4, name: "Pediatricians" },
    { id: 5, name: "Neurologist" },
    { id: 6, name: "Gastroenterologist" },
  ];

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row gap-5 items-start mt-5">
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {doctorSpecialities.map((doc) => (
            <p
              onClick={() =>
                speciality === doc.name
                  ? navigateToDoctorProfile("/doctors")
                  : navigateToDoctorProfile(`/doctors/${doc.name}`)
              }
              key={doc.id}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === doc.name ? "bg-indigo-100 text-black" : ""}`}
            >
              {doc.name}
            </p>
          ))}
        </div>
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6 px-3 sm:px-0">
          {filteredDoctors.map((doctor, index) => (
            <div
              onClick={() =>
                navigateToDoctorProfile(`/appointment/${doctor._id}`)
              }
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500 "
            >
              <img className="bg-blue-50" src={doctor.image} alt="doctor.img" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <div>
                  <p className="text-gray-900 text-lg font-medium">
                    {doctor.name}
                  </p>
                  <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
