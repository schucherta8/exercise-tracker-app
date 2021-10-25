import CardioForm from './cardio-form.component';
import WeightLiftingForm from './weightlifting-form.component';

const ExerciseForm = props => {
	if(props.type === 'CARDIO') {
		return <CardioForm 
			duration={props.duration} 
			distance={props.distance}
			onChange={props.onChange}/>
	} else {
		return <WeightLiftingForm 
			weight={props.weight}
			reps={props.reps}
			sets={props.sets}
			onChange={props.onChange}
		/>;
	}
};

export default ExerciseForm;