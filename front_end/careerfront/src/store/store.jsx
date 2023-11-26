import { create } from "zustand";

const store = (set) => ({
  information: sessionStorage.getItem("information")
    ? JSON.parse(sessionStorage.getItem("information"))
    : {
        name: "",
        email: "",
        quize_type: "High school",
        linguistic: 0,
        logical_mathematical: 0,
        bodily_kinesthetic: 0,
        spatial_visual: 0,
        interpersonal: 0,
        intrapersonal: 0,
        naturalist: 0,
        musical: 0,
      },
  setForm: (form, formData) =>
    set((data) => ({
      information: { ...data.information, [form]: formData },
    })),
  setIntelligence: (intelligence_type, value, prev = 0) =>
    set((data) => {
      const newInformation = {
        ...data.information,
        [intelligence_type]:
          Number(data.information[intelligence_type]) +
          Number(value) -
          Number(prev),
      };
      sessionStorage.setItem("information", JSON.stringify(newInformation));
      return { information: newInformation };
    }),
});

export const useStore = create(store);
