import { useContext } from 'react';
import { Context as TrackContext } from "../context/TrackContext";
import { Context as LocationContext } from "../context/LocationContext";

 export const useSaveTracks = () => {
   const { createTrack } = useContext(TrackContext);
   const { state: { name, locations }, reset } = useContext(LocationContext);

   const saveTrack = async () => {
     await createTrack(name, locations);

     reset();
   }

   return [saveTrack];
 }


