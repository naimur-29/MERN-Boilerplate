function genController(model, extra = {}) {
  this.model = model;
  return {
    //                   POST
    async add(req, res) {
      try {
        const data = req.body;
        const resData = await this.model.create(data);
        return res.status(201).json(resData);
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Post unsuccessful!", error });
      }
    },

    //                   DELETE
    async deleteAllByProperty(req, res) {
      try {
        const query = {
          id: req.params.id,
        };
        await this.model.deleteMany(query);
        return res.status(204).json({
          message: `Successfully deleted id=${req.params.id}!`,
        });
      } catch (error) {
        console.error(error);
        return res
          .status(400)
          .json({ message: `Delete id=${req.params.id} unsuccessful!`, error });
      }
    },
    async deleteAll(_req, res) {
      try {
        await this.model.deleteMany();
        return res.status(204).json({ message: "Delete all successful!" });
      } catch (error) {
        console.error(error);
        return res
          .status(400)
          .json({ message: "Delete all unsuccessful!", error });
      }
    },

    //                   GET
    async getAll(_req, res) {
      try {
        const data = await this.model.find();
        return res.status(200).json({ data });
      } catch (error) {
        console.error(error);
        return res.status(404).json({ message: "Not found!", error });
      }
    },
    async getAllByProperty(req, res) {
      try {
        const query = {
          id: req.params.id,
        };
        const data = await this.model.find(query);
        return res.status(200).json({ data });
      } catch (error) {
        console.error(error);
        return res.status(404).json({ message: "Not found!", error });
      }
    },
    //                   GET.SEARCH
    async searchByProperties(req, res) {
      try {
        const query = { ...req.query };

        const data = await this.model.find(query);
        return res.status(200).json({ data });
      } catch (error) {
        console.error(error);
        return res.status(404).json({ message: "Not found!", error });
      }
    },
    async containsInProperty(req, res) {
      try {
        const { context } = { ...req.query };
        const query = {
          context: { $regex: context, $options: "i" },
        };

        const data = await this.model.find(query);
        return res.status(200).json({ data });
      } catch (error) {
        console.error(error);
        return res.status(404).json({ message: "Not found!", error });
      }
    },

    //                   PUT
    async updateByProperty(req, res) {
      try {
        const query = {
          id: req.params.id,
        };
        const data = req.body;

        await this.model.updateOne(query, data);
        return res
          .status(200)
          .json({ message: `Updated id=${req.params.id} successfully!` });
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Not found!", error });
      }
    },

    // extra methods / methods overloading / methods overriding:
    ...extra,
  };
}

module.exports = genController;
