import TeacherService from '@services/TeacherService';
import { useState } from 'react';

type Props = {
  teacherId: number;
  learningPath: string;
  onUpdate?: () => void;
};

const LearningPath: React.FC<Props> = ({ teacherId, learningPath, onUpdate }: Props) => {
  const [currentLearningPath, setCurrentLearningPath] = useState(learningPath);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleLearningPathChange = async (event: { target: { value: string } }) => {
    const newLearningPath = event.target.value;
    setIsUpdating(true);
    try {
      await TeacherService.updateLearningPath(teacherId, newLearningPath);
      setCurrentLearningPath(newLearningPath);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Failed to update learning path:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      id="learningPath"
      className="p-1 border border-gray-300 rounded"
      value={currentLearningPath}
      onChange={handleLearningPathChange}
      disabled={isUpdating}
    >
      <option value="Infrastructure">Infrastructure</option>
      <option value="Software development">Software development</option>
      <option value="Cybersecurity">Cybersecurity</option>
    </select>
  );
};

export default LearningPath;
