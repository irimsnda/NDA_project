/**
 * created by TMDA team
 * user Dr. Masuke and Eng. Sadam 
 * 
 * created on 17/05/2021
 */

Ext.define('Admin.view.productrecallalert.viewcontrollers.ProductRecallAlertVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productRecallAlertVctr',

    /**
     * Called when the view is created
     */

    
     setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    
    setProductRegCombosStore: function (obj, options) {
        this.fireEvent('setProductRegCombosStore', obj, options);
    },

    showNewProductRecallAlertForm: function (btn) {

        var application_type = btn.app_type;
        this.fireEvent('onNewProductRecallAlert', application_type,btn);
    },

    
    setConfigCombosThscpfilterStore: function (obj, options) {

        this.fireEvent('setConfigCombosStoreWithThscpFilter', obj, options); //setConfigCombosStoreWithSectionFilter
    },
    
    setConfigCombosSectionfilterStore: function (obj, options) {

        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },

    showAllProductsDetailsSearch: function(btn) {
        var grid = Ext.widget(btn.childXtype);
        grid.addListener('itemdblclick', btn.handlerFn, this);
        funcShowCustomizableWindow("All Product Details Search", "90%", grid, 'customizablewindow');

    },

    
    loadSelectedRecallProduct :function(view, record) {
        var wrapper = Ext.ComponentQuery.query("#productRecallAlertCtn")[0],
            product_pnl = wrapper.down('#productRecallAlertDashWrapper'),
            product_form = product_pnl.down('#ProductRecallAlertFrm'),
            grid = view.up('grid');
           
        Ext.getBody().mask('loading...');        
       
        product_form.down('hiddenfield[name=product_id]').setValue(record.get('product_id'));
        product_form.down('textfield[name=brand_name]').setValue(record.get('brand_name'));

        /** set the batch window batch display batch number */
        product_description = record.get('brand_name') + ' (' + record.get('common_name') + ')' + record.get('product_strength');
        product_form.down('button[name=batch_search_btn]').winTitle = 'Get Imported Batches for '+ product_description;


        Ext.getBody().unmask();
        grid.up('window').close();
    },
    
    setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },
    

    showAllImportedBatchesForAProductSearch: function(btn) {
        var grid = Ext.widget(btn.childXtype);
        grid.addListener('itemdblclick', btn.handlerFn, this);
        funcShowCustomizableWindow(btn.winTitle, "70%", grid, 'customizablewindow');

    },

    
    loadSelectedRecallProductBatch :function(view, record) {
        var wrapper = Ext.ComponentQuery.query("#productRecallAlertCtn")[0],
        product_pnl = wrapper.down('#productRecallAlertDashWrapper'),
        product_form = product_pnl.down('#ProductRecallAlertFrm'),
        grid = view.up('grid');
       
        Ext.getBody().mask('loading...');        

        product_form.down('hiddenfield[name=tra_poe_permitsdata_id]').setValue(Ext.encode([record.get('tra_poe_permitsdata_id')]));
        product_form.down('textfield[name=batch_number]').setValue(record.get('batch_numbers'));


        Ext.getBody().unmask();
        grid.up('window').close();
    },

    saveSendProductRecallAlertDetails: function(btn) {
        var form_wizard = btn.up('productRecallAlertFrm'),
           frm = form_wizard.getForm();

           
       
       if(frm.isValid()){
           frm.submit({
               url: "api/thscp/saveSendProductRecallAlertDetails",
               params: {
                    module_id: 1,
                    sub_module_id: 68, 
                    section_id : 2
                },
               waitMsg: 'Please wait...',
               
               headers: {
                   'Authorization': 'Bearer ' + access_token,
                   'X-CSRF-Token': token
               },
               success: function (form, action) {
                   var response = Ext.decode(action.response.responseText),
                       success = response.success,
                       message = response.message;
                   if (success == true || success === true) {
                       toastr.success(message, "Success Response");
                   } else {
                       toastr.error(message, 'Failure Response');
                   }
               },
               failure: function (form, action) {
                   var resp = action.result;
                   toastr.error(resp.message, 'Failure Response');
               }
           });

       }else{
           toastr.warning('Please fill all mandatory fields!!!', 'Warning Response');
           return false;
       }
   },


});