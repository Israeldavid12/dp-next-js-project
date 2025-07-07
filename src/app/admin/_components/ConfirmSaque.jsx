import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function DialogDemo({ payout }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="hover:bg-accent px-3 py-2 rounded-md" > <i class="bi bi-calendar3-event-fill"></i> Detalhes </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalhes do pedido </DialogTitle>
             <p className="" ><span className="font-bold" >ID do saque:</span> {payout?.id}</p>
            <p className="" ><span className="font-bold" >Nome:</span> {payout?.name}</p>
            <p className="" ><span className="font-bold" >Montante:</span> {payout?.requested_amount}</p>
            <p className="" ><span className="font-bold" >Metodo de pagamento:</span> {payout?.payment_method?.toUpperCase()}</p>

            <DialogTitle> <p className="font-bold mt-5" >Detalhes do metodo de pagamento: </p></DialogTitle>
            <p className="" ><span className="font-bold" >Metodo de pagamento:</span> {payout?.payment_method?.toUpperCase()}</p>
            <p className="" ><span className="font-bold" >Titular:</span> {payout?.
              account_holder
              ?.toUpperCase()}</p>
            <p className="" ><span className="font-bold" >ID da conta:</span> {payout?.
              account_id
              ?.toUpperCase()}</p>
            <p className="" ><span className="font-bold" >ID do metodo de pagamento:</span> {payout?.
              payout_method_id
              ?.toUpperCase()}</p>

          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button >Ok</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
