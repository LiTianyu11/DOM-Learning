

export default function Chat({ contact, message, onChange, onClick }) {

    return (
        <section className="chat">
            <textarea name="" id="" cols="30" rows="10"
                value={message}
                onChange={e => onChange(e.target.value)}
            ></textarea>
            <br />
            <button onClick={onClick}> sent to {contact.name}</button>
        </section>
    )
}