import Image from "next/image";

export default function FilteredTour () {
    return (
    <>
    <section>
    <h2>Material</h2>
        <button><Image src="https://images.unsplash.com/photo-1515446134809-993c501ca304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="wood" width={100} height={100} /></button>
        <button><Image src="https://images.unsplash.com/photo-1576037728058-ab2c538ac8d0?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="plastic" width={100} height={100} /></button>
        <button><Image src="https://images.unsplash.com/photo-1624137527136-66e631bdaa0e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="cardboard" width={100} height={100} /></button>
        <button><Image src="https://images.unsplash.com/photo-1542661206-03e9001692de?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="glass" width={100} height={100} /></button>
    </section>
    </>
    )
};