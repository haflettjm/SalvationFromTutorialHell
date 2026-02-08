export const useModal = () => {
  const currentModal = useState<string | null>("", () => null);
  const openModal = (name: string) => (currentModal.value = name);

  const closeModal = () => (currentModal.value = null);

  return { currentModal, openModal, closeModal };
};
