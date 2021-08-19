//Hàm Scene()tạo ra một cảnh mới (scene), đại diện cho toàn bộ thế giới 3D mà chúng ta đang cố gắng hiển thị.
const scene = new THREE.Scene();

//Tiếp theo, chúng ta cần một máy ảnh(camera) để chúng ta có thể nhìn thấy cảnh.
//Theo thuật ngữ hình ảnh 3D, máy ảnh(camera) thể hiện vị trí của người xem trên thế giới
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z=5;//dat vi tri camera
//gom 4 doi so:
// Trường nhìn(the field of view): Diện tích phía trước máy ảnh rộng bao nhiêu để có thể nhìn thấy trên màn hình, tính bằng độ.
// Tỷ lệ khung hình: Thông thường, đây là tỷ lệ chiều rộng của cảnh chia cho chiều cao của cảnh. Sử dụng một giá trị khác sẽ làm sai lệch cảnh (có thể là những gì bạn muốn, nhưng thường thì không).
// Mặt phẳng gần: Các đối tượng máy ảnh có thể gần đến mức nào trước khi chúng ta ngừng hiển thị chúng lên màn hình. Hãy nghĩ xem khi bạn di chuyển đầu ngón tay ngày càng gần khoảng không giữa hai mắt, cuối cùng bạn không thể nhìn thấy nó nữa.
// mặt phẳng xa: Những thứ ở xa máy ảnh bao nhiêu trước khi chúng không được hiển thị nữa.
// Chúng ta cũng đặt vị trí của máy ảnh cách trục Z 5 đơn vị khoảng cách, giống như trong CSS, nằm ngoài màn hình về phía bạn, người xem.

//trinhf kết xuất(renderer):dt hiển thi 1 cảnh nhất định khi dc xem qua 1 camera dùng hàm tạo .WebGLRenderer()
const renderer = new THREE.WebGLRenderer(); //tao trinh ket xuat
renderer.setSize(window.innerWidth, window.innerHeight); //dat kich thuoc render se draw
document.body.appendChild(renderer.domElement); //noi canvas tao boi render vao body =. bat cu thu j rnder ra se hien trong cua so web

//tao khoi lap phuong
let cube; //tao bien toan cuc de co the truy cap khoi lap phuong tu bat ki dau

//tao dt TextureLoader
let loader = new THREE.TextureLoader();
//goi load de tai anh,nhan 2 tham so:
//-ket cau(texture) ta muon tai(load) va ham chay khi tai xong
// "./metal003.png" anh goc
loader.load("./715403.png", (texture) => {
  //sd thuoc tinh cua texture(cau truc) chi dinh rang muon
  //lap lai hinh anh 2x2 bao quanh tat ca cac mat cua khoi lap phuong
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1,1);//(2,2)

  //tao dt BoxGeometry va MeshLambertMaterial va ket hop(Mesh) lai voi nhau de tao lap phuong

  //dat dang hinh hoc(geometry) (ns cach khac la hinh dang (shape) cua no)
  let geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
  //vat lieu(material) (be mat cua no(surface) trong nhu the nao)
  let material = new THREE.MeshLambertMaterial({
    map: texture,
    shading: THREE.FlatShading,
  });
  //ket hop 2 dt tren de tao lap phuong
  cube = new THREE.Mesh(geometry, material);
  //them no vao canh
  scene.add(cube);
  draw(); //goi draw de bat dau canh
  
  //them anh sang vao canh
  
  //anh sang mem (sang toan bo khung canh 1 chut giong nhu mat troi khi o ben ngoai)
  let light = new THREE.AmbientLight("rgb(255,255,255)");
  scene.add(light);
  //anh sang tap trung(chum sang dinh huong nhu den pin/den chieu(spotlight) ngoai doi)
//   let spotLight = new THREE.SpotLight("rgb(255,255,255)");
//   spotLight.position.set(100, 1000, 1000); //thiet lap vi tri sang
//   spotLight.castShadow = true; //thiet lap bong
//   scene.add(spotLight);
});

draw = () => {
  //xoay khoi cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  //dung dt renderer render anh ra tren camera
  renderer.render(scene, camera);
  requestAnimationFrame(draw);
};
