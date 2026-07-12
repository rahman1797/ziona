import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/field";
import type { CatalogFilters, ProductCategory, ProductColor } from "@/types";
import { formatCategory, formatColor } from "@/utils/format";

export function CatalogFilters({
  filters,
  categoryOptions,
  colorOptions,
}: {
  filters: Required<CatalogFilters>;
  categoryOptions: ProductCategory[];
  colorOptions: ProductColor[];
}) {
  return (
    <form className="grid gap-4 rounded-lg border border-border bg-surface p-4 md:grid-cols-2 lg:grid-cols-6">
      <Label>
        Kategori
        <Select name="category" defaultValue={filters.category}>
          <option value="">Semua</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {formatCategory(category)}
            </option>
          ))}
        </Select>
      </Label>
      <Label>
        Warna
        <Select name="color" defaultValue={filters.color}>
          <option value="">Semua</option>
          {colorOptions.map((color) => (
            <option key={color} value={color}>
              {formatColor(color)}
            </option>
          ))}
        </Select>
      </Label>
      <Label>
        Urutkan
        <Select name="sort" defaultValue={filters.sort}>
          <option value="newest">Terbaru</option>
          <option value="price-asc">Harga terendah</option>
          <option value="price-desc">Harga tertinggi</option>
          <option value="name">Nama</option>
        </Select>
      </Label>
      <Label>
        Harga Minimum
        <Input
          name="min"
          type="number"
          min="0"
          defaultValue={filters.min || ""}
        />
      </Label>
      <Label>
        Harga Maksimum
        <Input
          name="max"
          type="number"
          min="0"
          defaultValue={filters.max || ""}
        />
      </Label>
      <Button className="self-end" type="submit">
        Terapkan filter
      </Button>
    </form>
  );
}
