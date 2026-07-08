// it is for searching , filterign , sorting and pagination of the data in the backend

export default class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search(searchFields = []) {
    if (this.queryString.search && searchFields.length > 0) {
      const searchRegex = new RegExp(this.queryString.search, "i");

      this.query = this.query.find({
        $or: searchFields.map((field) => ({
          [field]: searchRegex,
        })),
      });
    }

    return this;
  }

  filter(allowedFilters = []) {
    const filters = {};

    allowedFilters.forEach((field) => {
      if (this.queryString[field]) {
        filters[field] = this.queryString[field];
      }
    });

    this.query = this.query.find(filters);

    return this;
  }

  sort() {
    const sortBy = this.queryString.sortBy || "createdAt";
    const order = this.queryString.order === "asc" ? 1 : -1;

    this.query = this.query.sort({
      [sortBy]: order,
    });

    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;

    const skip = (page - 1) * limit;

    this.page = page;
    this.limit = limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}