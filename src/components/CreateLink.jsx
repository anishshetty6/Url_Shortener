import React, { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { urlState } from '@/context'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Error from './Error'
import { Card } from './ui/card'
import * as yup from 'yup'
import { QRCode } from 'react-qrcode-logo'
import useFetch from '@/hooks/useFetch'
import { createUrl } from '@/db/apiUrls'
import { BeatLoader } from 'react-spinners'

const CreateLink = () => {

    const { user } = urlState()
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get('createNew');

    const ref = useRef();

    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: "",
    });

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl: yup
            .string()
            .url("Must be a valid URL")
            .required("Long URL is required"),
        customUrl: yup.string(),
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    };

    const { loading, error, data, fn: fnCreateUrl } = useFetch(createUrl, { ...formValues, user_id: user.id })

    useEffect(() => {
        if (error == null && data) {
            navigate(`/link/${data[0].id}`);
        }
    }, [error, data]);

    const createNewLink = async () => {
        setErrors([]);
        try {
            await schema.validate(formValues, { abortEarly: false });
            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));

            await fnCreateUrl(blob);
        } catch (e) {
            const newErrors = {};
            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            })
            setErrors(newErrors);
        }
    }

    return (

        <Dialog defaultOpen={longLink}
            onOpenChange={(res) => {
                if (!res) setSearchParams({});
            }}
        >
            <DialogTrigger>
                <Button variant="destructive">Create New Link</Button>
            </DialogTrigger>
            <DialogContent classname='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
                </DialogHeader>

                <div className='p-4 flex justify-center items-center'>
                    {formValues?.longUrl && <QRCode value={formValues?.longUrl} size={150} ref={ref} qrStyle='squares' logoImage='/public/logo.png' logoHeight={50} logoWidth={50} />}
                </div>

                <Input id='title' placeholder='Short Link Title' value={formValues.title}
                    onChange={handleChange} />
                {errors.title && <Error message={errors.title} />}

                <Input id='longUrl' placeholder='Long URL' value={formValues.longUrl} onChange={handleChange} />
                {errors.longUrl && <Error message={errors.longUrl} />}

                <div className='flex items-center gap-2'>
                    <Card className='p-2'>trimrr.in</Card> /
                    <Input id='customUrl' placeholder='Custom Link (optional)' value={formValues.customUrl} onChange={handleChange} />
                    {error && <Error message={error.message} />}
                </div>

                <DialogFooter>
                    <Button variant='destructive'
                        disabled={loading}
                        onClick={createNewLink}>
                        {loading ? <BeatLoader size={10} color="white" /> : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CreateLink