export const errorMessageGenerator = (messages: string | string[]) => {
  let errorFormText = '';
  if (typeof messages === 'string') return (errorFormText = messages);
  if (Array.isArray(messages)) {
    return messages.forEach((el) => (errorFormText += `${el} </br>`));
  }
};
