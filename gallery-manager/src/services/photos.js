
import http from '../utils/http';

const url = 'http://107.182.180.211:7001';
export async function photoList(id) {

  return http.get(`${url}/m/gallery/${id}/photoList`, {
  
  });
}

  export async function removePhoto(id) {

    return http.delete(`${url}/manager/photos/${id}`, {
    
    });
  
}




