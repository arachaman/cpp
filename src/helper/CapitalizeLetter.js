const CapitalizeLetter = (text) => {
    const finalSentence = text.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    return finalSentence
}

export default CapitalizeLetter