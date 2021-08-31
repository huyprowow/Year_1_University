// import React from "react";
// import ReactDOM from "react-dom";
// import './paginationComponent.css';

// class Pagination extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//         }
//     }

//     handlerPageChangePrev = () => {
//         const prev = this.props.page - 1;
//         this.props.onPageChangePrev(prev);
//     }
//     handlerPageChangeNext = () => {
//         const next = this.props.page + 1;
//         this.props.onPageChangeNext(next);
//     }

//     render() {
//         // console.log(this.props);
//         let { page, limit, totalRows } = this.props;
//         // console.log(page, limit, totalRows );
//         const totalPages = Math.ceil(totalRows / limit);
//         //tong trang = toong hang chia so hang goi han
//         return (
//             <div>
//                 <button id='btn-prev'
//                     disabled={page <= 1}
//                     onClick={this.handlerPageChangePrev}
//                 >
//                     truoc
//                 </button>
//                 <button id='btn-next'
//                     disabled={page >= totalPages}
//                     onClick={this.handlerPageChangeNext}
//                 >
//                     sau
//                 </button>
//             </div>
//         );
//     }
// }
// export default Pagination;

// // import React from "react";
// // import PropTypes from 'prop-types'
// // // import Pagination from "react-js-pagination";

// // Pagination.propTypes = {
// //     pagination: PropTypes.object.isRequired,
// //     onPageChange: PropTypes.func
// // };

// // Pagination.defaultProps = {
// //     onPageChange: null
// // };

// // function Pagination(props) {
// //     const { pagination, onPageChange } = props;
// //     const { page, limit, totalRow } = pagination;
// //     const totalPages=Math.ceil(totalRow/limit);

// //     if (onPageChange) {
// //         onPageChange(newPage);
// //     }
// //     return (

// //     );
// // }

// // export default Pagination;