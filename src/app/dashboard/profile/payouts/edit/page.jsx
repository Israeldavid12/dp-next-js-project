'use client'
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const EditPayoutPage = () => {
    const parms = useSearchParams()
    const holder = parms.get('holder')
    const acc_id = parms.get('acc_id')
    const methodId = parms.get('id')
    const [is_saving, setSaving] = useState(false)
    const token = localStorage.getItem('sessionToken')
    const router = useRouter()


    const hanldeUpdate = async (e) => {
        e.preventDefault()
        const method_type = e.target.method_type.value
        const account_holder = e.target.account_holder.value
        const account_id = e.target.account_id.value

        try {
            setSaving(true)
            const response = await axios.post('http://localhost:4000/api/payouts-methods/update', {
                methodId,
                method_type,
                account_holder,
                account_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response?.data?.statusCode == 200) {
                router.push('/dashboard/profile')
                setSaving(false)
                return
            }

        } catch (e) {
            setSaving(false)
        }

    }


    return (
        <div className="bg-white p-5 flex-col gap-3" >
            <p className="text-[20px font-[600] mb-2" >Editar metodo de pagamento</p>
            <form onSubmit={hanldeUpdate} className="grid gap-4" action="">
                <label htmlFor="account_holder">Titular</label>
                <Input className="" name="account_holder" type="text" placeholder="" defaultValue={holder} />
                <label htmlFor="account_id">Número da conta</label>
                <Input className="" name="account_id" type="text" placeholder="" defaultValue={acc_id} />
                <Select
                    name='method_type'>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione o metodo de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel >Metodo de pagamento</SelectLabel>
                            <SelectItem value="eMola">eMola</SelectItem>
                            <SelectItem value="Mpesa">Mpesa</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button type="submit" size="sm" className="w-100" >
                    <Loader2Icon className={`${is_saving ? 'animate-spin' : 'hidden'}`} />
                    Atualizar
                </Button>
            </form>
        </div>
    )
}

export default EditPayoutPage;