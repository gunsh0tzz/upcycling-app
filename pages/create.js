import Form from "@/components/Form"


export default function Create ({addIdea}){
    function handleSubmit(newIdea) {
        addIdea(newIdea);
      }
return (<>
<Form onSubmit={handleSubmit}/>

</>) 

}
