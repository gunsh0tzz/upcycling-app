import Form from "@/components/Form"
import Header from "@/components/Header"

export default function Create ({addIdea}){
    function handleSubmit(newIdea) {
        addIdea(newIdea);
      }
return (<>
<Header/>
<Form onSubmit={handleSubmit}/>

</>) 

}
