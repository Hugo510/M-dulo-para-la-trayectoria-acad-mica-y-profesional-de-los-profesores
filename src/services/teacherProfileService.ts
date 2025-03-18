import axiosInstance from "./axiosInstance";

const TEACHER_PROFILE_API_URL =
  import.meta.env.VITE_API_TEACHER_PROFILE_URL || "/teacher-profile";

export const teacherProfileService = {
  // Obtiene el perfil completo de un profesor por su ID
  getProfileById: (teacherId: number | string) => {
    return axiosInstance.get(`${TEACHER_PROFILE_API_URL}/${teacherId}`);
  },

  // Actualiza una sección específica del perfil
  updateProfileSection: (
    teacherId: number | string,
    sectionName: string,
    data: any
  ) => {
    return axiosInstance.put(
      `${TEACHER_PROFILE_API_URL}/${teacherId}/${sectionName}`,
      data
    );
  },

  // Añade un elemento a una sección del perfil (ej: nueva experiencia laboral)
  addToProfileSection: (
    teacherId: number | string,
    sectionName: string,
    data: any
  ) => {
    return axiosInstance.post(
      `${TEACHER_PROFILE_API_URL}/${teacherId}/${sectionName}`,
      data
    );
  },

  // Elimina un elemento de una sección del perfil
  deleteFromProfileSection: (
    teacherId: number | string,
    sectionName: string,
    itemId: number | string
  ) => {
    return axiosInstance.delete(
      `${TEACHER_PROFILE_API_URL}/${teacherId}/${sectionName}/${itemId}`
    );
  },
};
