import ButtonStyle from '@/components/ButtonStyle'

export default function PreviewRtl({ isRtl, handleSetIsRtl }) {
  return (
    <button onClick={() => handleSetIsRtl(!isRtl)}>
      <ButtonStyle
        buttonEmoji={isRtl ? '👈' : '👉'}
        buttonText={isRtl ? 'RTL' : 'LTR'}
        buttonActive={isRtl}
      />
    </button>
  )
}