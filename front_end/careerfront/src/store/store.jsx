import { create } from "zustand";

const store = (set) => ({
  information: {
    name: "",
    email: "",
    quize_type: "High school",
    linguistic: 0,
    logical_mathematical: 0,
    bodily_kinesthetic: 0,
    spatial_visual: 0,
    interpersonal: 0,
    intrapersonal: 0,
    naturalistic: 0, // edit to naturalist
  },
  setForm: (form, formData) =>
    set((data) => ({
      information: { ...data.information, [form]: formData },
    })),
});

export const useStore = create(store);
