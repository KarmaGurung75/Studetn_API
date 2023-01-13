import Batch from "../model/batch.js";


// Add new Batch
export const addBatch = async (req, res) => {
    try {
        const { batchName } = req.body;
        if (!batchName) {
            return res.status(400).json({
                success: true,
                message: "Fill all the Field"
            });
        }

        const exist = await Batch.findOne({ batchName });
        if (exist) {
            return res.status(400).json({
                success: false,
                message: "Batch already exist"
            })
        }

        const batch = await Batch.create({
            batchName,
        })

        res.status(200).json({
            success: true,
            message: "Batch Added Successfully",
            data: batch

        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
    
}

// Get all Batch
export const getBatch = async (req, res) => {
    try {
        const batch = await Batch.find(req.params.batch_id);
        if (!batch) {
            return res.status(400).json({
                success: true,
                message: "Batch Does not exist"
            })
        }

        res.status(200).json({
            success: true,
            message: "Batch Details",
            data: batch
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}

