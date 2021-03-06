import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import UpdateProduct from "./UpdateProduct";

describe('Update poducts', () => {
  it('checks if "Edit" button is rendered', () => {
    render(
      <Provider store={store}>
        <UpdateProduct product={{
          id: 1,
          name: "Test product",
          price: 1
        }} />
      </Provider>
    );
    const buttonElement = screen.getByRole("button", { name: /edit/i});
    expect(buttonElement).toBeInTheDocument();
  });

  it('checks if "New values" text is rendered after clicking the "Edit" button', () => {
    render(
      <Provider store={store}>
        <UpdateProduct product={{
          id: 1,
          name: "Test product",
          price: 1
        }} />
      </Provider>
    );
    const editButtonElement = screen.getByRole("button", { name: "Edit"});
    fireEvent.click(editButtonElement);
    const buttonElement = screen.getByText(/new values/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('checks that "Submit" button is not rendered if "Edit" button is not clicked', () => {
    render(
      <Provider store={store}>
        <UpdateProduct product={{
          id: 1,
          name: "Test product",
          price: 1
        }} />
      </Provider>
    );
    const buttonElement = screen.queryByRole("button", { name: "Submit changes"});
    expect(buttonElement).not.toBeInTheDocument();
  });
  
  it('checks that "Submit" button is rendered if "Edit" button is clicked', () => {
    render(
      <Provider store={store}>
        <UpdateProduct product={{
          id: 1,
          name: "Test product",
          price: 1
        }} />
      </Provider>
    );
    const editButtonElement = screen.getByRole("button", { name: "Edit"});
    fireEvent.click(editButtonElement);
    const buttonElement = screen.getByRole("button", { name: "Submit changes"});
    expect(buttonElement).toBeInTheDocument();
  });
  
  it('checks that input value is changed when submiting name change', () => {
    render(
      <Provider store={store}>
        <UpdateProduct product={{
          id: 1,
          name: "Test product",
          price: 123
        }} />
      </Provider>
    );
    const editButtonElement = screen.getByRole("button", { name: "Edit"});
    fireEvent.click(editButtonElement);
    const inputElement = screen.getByDisplayValue(/test product/i) as HTMLInputElement
    fireEvent.change(inputElement, {target: {value: "New name"}});
    const submitButtonElement = screen.getByRole("button", { name: "Submit changes"});
    fireEvent.click(submitButtonElement)
    expect(inputElement.value).toBe("New name");
  });

  it('checks that input value is changed when submiting price change', () => {
    render(
      <Provider store={store}>
        <UpdateProduct product={{
          id: 1,
          name: "Test product",
          price: 123
        }} />
      </Provider>
    );
    const editButtonElement = screen.getByRole("button", { name: "Edit"});
    fireEvent.click(editButtonElement);
    const inputElement = screen.getByDisplayValue(/123/i) as HTMLInputElement
    fireEvent.change(inputElement, {target: {value: "321"}});
    const submitButtonElement = screen.getByRole("button", { name: "Submit changes"});
    fireEvent.click(submitButtonElement)
    expect(inputElement.value).toBe("321");
  });

  it('checks that error message is displayed when submitting with empty input product name', () => {
    render(
      <Provider store={store}>
        <UpdateProduct product={{
          id: 1,
          name: "Test product",
          price: 123
        }} />
      </Provider>
    );
    const editButtonElement = screen.getByRole("button", { name: "Edit"});
    fireEvent.click(editButtonElement);
    const inputElement = screen.getByDisplayValue(/test product/i) as HTMLInputElement
    fireEvent.change(inputElement, {target: {value: ""}});
    const submitButtonElement = screen.getByRole("button", { name: "Submit changes"});
    fireEvent.click(submitButtonElement);
    const errorMessage = screen.getByText(/fill in name and price/i);
    expect(errorMessage).toBeInTheDocument();
  });
  

});
