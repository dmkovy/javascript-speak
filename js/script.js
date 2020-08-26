const { speechSynthesis } = window

const voicesSelect = document.getElementById('voices')
const rate = document.getElementById('rate')
const pitch = document.getElementById('pitch')
const text = document.getElementById('text')

let voices = []

//* Генерация голосов
const generateVoices = () => {
	voices = speechSynthesis.getVoices()

	const voicesList = voices.map((voice, index) => `<option value=${index}>${voice.name} (${voice.lang})</option>`).join('')

	voicesSelect.innerHTML = voicesList
}

//* Воспроизведение голосов
const speak = () => {
	if (speechSynthesis.speaking) {
		console.log('Текст еще озвучивается. Дождитесь окончания! Или нажмите кнопку "Остановить".')
		return
	}

	if (text.value !== '') {
		const ssUtterance = new SpeechSynthesisUtterance(text.value)

		ssUtterance.voice = voices[voicesSelect.value]
		ssUtterance.pitch = pitch.value
		ssUtterance.rate = rate.value

		speechSynthesis.speak(ssUtterance)
	}
}

generateVoices()

document.getElementById('btn-stop').addEventListener('click', speechSynthesis.cancel())
document.getElementById('btn-start').addEventListener('click', speak)

speechSynthesis.addEventListener('voiceschanged', generateVoices)