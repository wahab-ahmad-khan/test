import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import Back from "../assets/back.svg";
import { useDropzone } from "react-dropzone";
import Bin from "../assets/Trash.svg";
import Plus from "../assets/+.png";
import Remove from "../assets/x.png";
import Edit from "../assets/Edit.svg";
import Pin from "../assets/pin.png";
import Save from "../assets/save.png";
import { Link } from "react-router-dom";
import ImageMarker from "react-image-marker";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ProjectDetail = () => {
	const [uploadedFiles, setUploadedFiles] = useState([]); // ------------- The whole uploaded images and there pins and comments stores in it
	const [rejected, setRejected] = useState([]); // ------------- RejetedFiles on uploading stores in it
	const [selectedFile, setSelectedFile] = useState(null); // ------------- SelectedFile for preview stores in it
	const [addPin, setAddPin] = useState(null); // ------------- This is to chech the addPin btn for make a comment
	const [comment, setComment] = useState(""); // ------------- comment value is stored in it and once it is saved it moves to uploadedFiles
	const [error, setError] = useState(null); // -------------- Error check for both pin and comment should exist before saving the image
	const [previousSelectedFile, setPreviousSelectedFile] = useState(null); //----------------- For animation of pins

	//---------------Change 0f selectedImage -------------------------------------------------
	const handleCheckboxChange = (index) => {
		selectedFile !== null && setPreviousSelectedFile(selectedFile);
		const updatedFiles = uploadedFiles.map((file, i) => ({
			...file,
			selected: i === index,
			name: file.name,
		}));
		setComment(
			uploadedFiles[index].comment && uploadedFiles[index].comment !== ""
				? uploadedFiles[index].comment
				: ""
		);
		setAddPin(uploadedFiles[index].comment ? "save" : null);
		setSelectedFile(uploadedFiles[index]);
		setUploadedFiles(updatedFiles);
	};
	//---------------Delete 0f Image from list --------------------------------------

	const handleDeleteImage = (index) => {
		setSelectedFile(uploadedFiles[index]?.selected ? null : selectedFile);
		const updatedFiles = uploadedFiles.filter((file, i) => i !== index);
		setUploadedFiles(updatedFiles);
	};

	//---------------Drag 0f Image in list --------------------------------------

	const handleDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		const items = Array.from(uploadedFiles);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setUploadedFiles(items);
	};
	//---------------Upload 0f Image in list --------------------------------------

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			"image/jpeg": [],
			"image/png": [],
		},
		maxFileSize: 5000000,
		onDrop: (acceptedFiles, rejectedFiles, events) => {
			setUploadedFiles((prevUploadedFiles) => [
				...prevUploadedFiles,
				...acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				),
			]);
			setRejected(rejectedFiles.map((file) => file));
		},
	});
	//---------------Pin design placed on Image in preview --------------------------------------

	const [animationKey, setAnimationKey] = useState(0);

	useEffect(() => {
		if (previousSelectedFile) {
			setAnimationKey((prevKey) => prevKey + 1);
			const elements = document.getElementsByClassName("image-marker__marker");
			if (elements.length > 0) {
				elements[0].classList.add(`image-marker__${animationKey}`);
				elements[0].classList.remove(`image-marker__${animationKey - 1}`);
			}
		}
	}, [previousSelectedFile]);
	const CustomMarker = () => {
		return (
			<div
				className={`image-marker__marker image-marker__marker--default `}
				style={{ backgroundColor: "transparent" }}
				id="child"
				data-testid="marker">
				{previousSelectedFile &&
					previousSelectedFile?.markerData?.length > 0 &&
					selectedFile?.markerData?.length > 0 && (
						<style>
							{`
          @keyframes slideAnimation {
            from {
              top: ${previousSelectedFile?.markerData[0]?.top}%;
              left: ${previousSelectedFile?.markerData[0]?.left}%;
            }
            to {
              top: ${selectedFile?.markerData[0]?.top}%;
              left: ${selectedFile?.markerData[0]?.left}%;
            }
          }

          .image-marker__${animationKey - 1} {
            animation-name: slideAnimation;
            animation-duration: 2s;
			
          }
        `}
						</style>
					)}
				<img src={Pin} alt="Pin" className="pin" />
			</div>
		);
	};

	//---------------Pin is added and saved in corresponding states in here --------------------------------------

	const handlePinsView = (marker) => {
		setSelectedFile((file) => ({
			...file,
			markerData: [marker],
		}));
		setUploadedFiles((files) =>
			files.map((file, i) =>
				file.selected ? { ...uploadedFiles[i], markerData: [marker] } : file
			)
		);
	};

	//---------------Save pin and comment in here --------------------------------------

	const handleSavePinData = (e) => {
		setError(null);
		e.preventDefault();
		if (comment?.length > 0 && selectedFile?.markerData?.length > 0) {
			setAddPin("save");

			setUploadedFiles((files) =>
				files.map((file, i) =>
					file.selected ? { ...uploadedFiles[i], comment: comment } : file
				)
			);
		} else {
			setError(
				"Please add a comment and add a pin on the above image by clicking on any point of the image."
			);
		}
	};

	//-------------- Remove pin on comment delete -------------------------------

	const handleRemovePin = () => {
		setAddPin(null);
		setUploadedFiles((files) =>
			files.map((file, i) =>
				file.selected
					? { ...uploadedFiles[i], comment: "", markerData: [] }
					: file
			)
		);
		setSelectedFile((file) => ({
			...file,
			markerData: [],
		}));
	};
	return (
		<>
			<div className="wrapper">
				<SideBar />
				<div className="default-sidebar-margin mt-3">
					<div className="row w-100 m-0 p-0">
						<div className="col-lg-4 col-md-4 col-sm-12">
							<div className="w-100 bg-white inner-wrapper list-image-wrapper pb-3 mt-3">
								<div className="header-details p-2 px-md-4 d-flex align-items-center">
									Upload Images
								</div>
								<div className="w-100 px-3 px-md-2">
									<div
										{...getRootProps({
											className: "dropzone-upload-wrapper mt-3",
										})}>
										<input {...getInputProps()} />
										<div className="dropzone-inner-wrapper">
											<div className="browse-text">
												Drag and drop or{" "}
												<button className="btn-pill">Browse</button>
											</div>
										</div>
									</div>
								</div>
								{rejected.length > 0 && (
									<div className="w-100 px-3 px-md-2 text-center">
										<p className="text-danger mt-3 mb-3">
											<i>
												Only JPEG & PNG files are acceptable, {rejected.length}{" "}
												files are rejected!
											</i>
										</p>
									</div>
								)}
								{uploadedFiles.length > 0 && (
									<div className="w-100 px-3 px-md-2">
										<DragDropContext onDragEnd={handleDragEnd}>
											<Droppable droppableId="imageList">
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.droppableProps}>
														{uploadedFiles.map((url, index) => (
															<Draggable
																key={url.name}
																draggableId={url.name}
																index={index}>
																{(provided) => (
																	<div
																		className={`mt-3 ${
																			url.selected
																				? "selected-box"
																				: "unselected-box"
																		}`}
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}>
																		<div className="w-100 d-flex justify-content-between align-items-center">
																			<p className="images-name p-0 m-0">
																				{url.name}
																			</p>
																			<div className="d-flex align-items-center">
																				<img
																					className="mr-1 bin cpointer"
																					src={Bin}
																					alt="bin"
																					onClick={() =>
																						handleDeleteImage(index)
																					}
																				/>
																				<label className="checkbox-container mb-0">
																					<input
																						type="checkbox"
																						checked={url.selected}
																						onChange={() =>
																							handleCheckboxChange(index)
																						}
																					/>
																					<span className="checkmark"></span>
																				</label>
																			</div>
																		</div>
																		<img
																			className="w-100  mt-1"
																			src={url.preview}
																			alt="any-img"
																			onClick={() =>
																				handleCheckboxChange(index)
																			}
																		/>
																	</div>
																)}
															</Draggable>
														))}
														{provided.placeholder}
													</div>
												)}
											</Droppable>
										</DragDropContext>
									</div>
								)}
							</div>
						</div>
						<div className="col-lg-8 col-md-8 col-sm-12">
							<div className="w-100 m-2">
								<div className="row m-0 p-0 w-100">
									<div className="col-lg-7 col-md-6 col-sm-12 mt-3">
										<div className="floating-label-textfield details-fields ">
											<input
												placeholder=" "
												type="text"
												onChange={(e) => console.log("Value: ", e.target.value)}
												required
											/>
											<label>Project Name</label>
										</div>
										<div className="floating-label-textfield details-fields mt-3">
											<input
												placeholder=" "
												type="url"
												onChange={(e) => console.log("Value: ", e.target.value)}
												required
											/>
											<label>URL</label>
										</div>
									</div>
									<div className="col-lg-5 col-md-6 col-sm-12 d-flex align-items-center mt-3 py-2 px-2">
										<Link to="/projects-listing">
											<button className="back-btn">
												<img className="mr-2" src={Back} alt="back-btn" /> Back
											</button>
										</Link>
										<button className="btn" disabled>
											Save Project
										</button>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-10 p-2 px-md-4">
										<div className="header-details d-flex align-items-center">
											Upload Images
										</div>
										<div
											className="w-100 image-viewer"
											style={{
												minHeight: selectedFile == null ? "570px" : "auto",
											}}>
											{selectedFile == null ? (
												<p className="italic-not-found mt-3">
													No image selected
												</p>
											) : (
												<>
													<div
														className="w-100"
														style={{ position: "relative" }}>
														<ImageMarker
															src={selectedFile.preview}
															markers={
																selectedFile.markerData
																	? selectedFile.markerData
																	: []
															}
															className="wahab"
															onAddMarker={(marker) => handlePinsView(marker)}
															markerComponent={CustomMarker}
														/>
													</div>
													<p className="text-danger mb-3">
														<i>{error}</i>
													</p>
													{addPin === null ? (
														<button
															className="add-remove-btn d-flex align-items-center juutify-content-center cpointer mt-3 mb-3"
															onClick={() => setAddPin("add")}>
															<img className="mr-1" src={Plus} alt="+" />{" "}
															<u>Add a Pin</u>
														</button>
													) : addPin === "add" ? (
														<div className="row m-0 p-0 w-100">
															<form
																className="w-100"
																onSubmit={handleSavePinData}>
																<div className="w-100 pl-0 d-flex align-items-center justify-content-start">
																	<div className="floating-label-textfield details-fields max-width-overRide m-0 mt-3 mb-3">
																		<input
																			placeholder=" "
																			type="text"
																			value={comment}
																			onChange={(e) =>
																				setComment(e.target.value)
																			}
																			style={{ maxWidth: "443px" }}
																			required
																		/>
																		<label>Make a comment</label>
																	</div>
																	<button
																		type="submit"
																		className="add-remove-btn ml-4 d-flex align-items-center juutify-content-center cpointer">
																		<img className="mr-1" src={Save} alt="x" />{" "}
																		<u>Save</u>
																	</button>
																</div>
															</form>
														</div>
													) : addPin === "save" ? (
														<div className="comment-detail-wrapper d-flex align-items-center justify-content-between mt-3">
															<div className="comment-content pr-2">
																{comment}
															</div>
															<div className="d-flex align-items-center">
																<button
																	className="add-remove-btn d-flex align-items-center juutify-content-center cpointer"
																	onClick={() => setAddPin("add")}>
																	<img className="mr-1" src={Edit} alt="x" />{" "}
																	Edit
																</button>
																<button
																	className="add-remove-btn ml-3 d-flex align-items-center juutify-content-center cpointer"
																	onClick={() => handleRemovePin()}>
																	<img className="mr-1" src={Remove} alt="x" />{" "}
																	Remove
																</button>
															</div>
														</div>
													) : (
														""
													)}
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProjectDetail;
