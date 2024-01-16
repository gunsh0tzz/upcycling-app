import { useRouter } from "next/router";

export default function Form ({onSubmit}) {
const router = useRouter();
    function handleSubmit(event){
        event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));

    data.items = data.items.split(",").map((item) => item.trim());
    data.hashtags = data.hashtags.split(",").map((item) => item.trim());
    data.instructions = data.instructions.split(",").map((item) => item.trim());

    onSubmit(data);
    window.alert("Your new idea has been added!");
    const form = event.target.elements;
    event.target.reset();
    form.title.focus();
    router.push("/");
    }
return(
    <form onSubmit={handleSubmit}>
        <label htmlFor="title">
            title:
        
        </label>
        <input id="title" name="title"/>
        <label htmlFor="image">
            image:
        
        </label>
        <input id="image" name="image"/>
        <label htmlFor="items">
            items:
        
        </label>
        <input id="items" name="items"/>

        <label htmlFor="instructions">
            instructions:
        
        </label>
        <input id="instructions" name="instructions"/>
        <label htmlFor="hashtags">
            hashtags:
        
        </label>
        <input id="hastags" name="hashtags"/>

        <button>add</button>
    </form>
)   
}

