import { DashboardSkeleton } from "@/components/shared/DashboardSkeleton"
import HeartbeatLoader from "@/components/shared/HearbeatLoader"
import { ManagementPageLoading } from "@/components/shared/ManagementPageLoader"

const page = () => {
  return (
    <div>
        <DashboardSkeleton/>
        <ManagementPageLoading 
            columns={10} 
            hasActionButton 
            filterCount={5}
            filterWidths={["w-48", "w-32", "w-40", "w-24", "w-36"]}
        />
        <HeartbeatLoader/>
    </div>
  )
}

export default page