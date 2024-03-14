import JobDetailsPage from "@/components/JobDetailsPage";
import { notFound } from "next/navigation";
export default function JobDetails({params}:{params:{detailsId:string}}) {
    if(parseInt(params.detailsId)>50){
        notFound();
    }
 console.log(params.detailsId);
    return (
        <>
        <JobDetailsPage id={params.detailsId}/>
        </>
        )
}