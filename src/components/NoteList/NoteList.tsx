import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../services/noteService";
import type { Note} from "../../types/Note"
import css from "./NoteList.module.css"


interface NoteListProps{
  notes: Note[];
  deleteTask: () => void;
}

export default function NoteList({notes}:NoteListProps){

const querylient = useQueryClient();

const mutation = useMutation({
  mutationFn: deleteTask,
  onSuccess(){
    querylient.invalidateQueries({queryKey: ['notes']});
  }
})

    return(
    <ul className={css.list}>
	{notes.map(item =>(  
    <li key={item.id} className={css.listItem}>
    <h2 className={css.title}>{item.title}</h2>
    <p className={css.content}>{item.content}</p>
    <div className={css.footer}>
      <span className={css.tag}>{item.tag}</span>
      <button className={css.button} onClick={() => mutation.mutate(item.id)}>Delete</button>
    </div>
  </li>))}

</ul>
)
}
