export default interface IGenericScreenProps {
    error: Error;
    customMessage?: string;
    resetAndTryAgain():void;
}