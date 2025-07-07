import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import styles from '../layout.module.css'
import { usePathname } from "next/navigation"





export default function SheetDemo() {
  const pathname = usePathname()


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"><i class="bi bi-list"></i></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <div className='grid gap-3' >
            <a href="/admin" className={`flex justify-start items-center gap-4 p-3   text-[18px] ${pathname === "/admin" ? styles.activeSideItem : ""}`}> <i className="bi bi-house text-[18px]"></i> Inicio</a>

            <a href="/admin/saques" className={`flex justify-start items-center gap-4 p-3 text-[18px] ${pathname === "/admin/saques" ? styles.activeSideItem : ""}`}>
              <i class="bi bi-cash text-[18px]"></i> Saques</a>

            <a href="/admin/profile" className={`flex justify-start items-center gap-4 p-3 text-[18px] ${pathname === "/admin/profile" ? styles.activeSideItem : ""}`}> <i className="bi bi-person-circle text-[18px]"></i>   Minha conta</a>

          </div>
        </SheetHeader>
        
        <SheetFooter>
        
          <SheetClose asChild>
            <Button variant="outline">Fechar </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
