import GenerateForm from "@/components/GenerateForm"


// export const dynamic = 'force-dynamic'


export default async function Index() {
  // const supabase = createServerComponentClient({ cookies })

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col items-center w-full">
      <GenerateForm />
    </div>
  )
}
