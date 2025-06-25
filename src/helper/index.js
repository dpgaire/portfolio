function formatAnswerToHTML(text) {
  return text
    .replace(/\n\n/g, '<br/><br/>')                         // Double line break
    .replace(/\n/g, '<br/>')                                // Single line break
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-700 font-semibold">$1</strong>');  // Bold
}

export {formatAnswerToHTML}