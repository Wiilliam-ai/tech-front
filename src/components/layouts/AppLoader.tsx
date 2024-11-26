import { Loader } from './../custom/loader/Loader'
export const AppLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-black opacity-90">
      <Loader />
    </div>
  )
}
