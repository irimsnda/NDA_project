Ext.define('Admin.view.importexportpermits.viewcontrollers.ImportExportPermitsVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.importexportpermitsvctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },  onOlineIntrayItemDblClick: function (view, record, item, index, e, eOpts) {
        this.fireEvent('previewImpSingleExpOnlineApplication',view, record);
    },
    showAddApplicationEvaluationComment: function (btn) {
        btn.setDisabled(true);
        var grid = btn.up('grid'),
            panel = grid.up('panel'),
            form = panel.down('form');
        form.setVisible(true);
    },
    showEditApplicationEvaluationComment: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            grid = btn.up('grid'),
            panel = grid.up('panel'),
            form = panel.down('form'),
            add_btn = grid.down('button[name=add_btn]');
        form.loadRecord(record);
        form.setVisible(true);
        add_btn.setDisabled(true);
    },

    cancelAddApplicationEvaluationComment: function (btn) {
        var form = btn.up('form'),
            panel = form.up('panel'),
            grid = panel.down('grid'),
            add_btn = grid.down('button[name=add_btn]');
        form.setVisible(false);
        add_btn.setDisabled(false);
    },

    setProductRegGridsStore: function (obj, options) {
        this.fireEvent('setProductRegGridsStore', obj, options);
    },
    onpreviewonlineimpApplicationdetails:function(item){
        var record = item.getWidgetRecord(),
            grid = item.up('grid');

        this.fireEvent('previewImpExpOnlineApplication',grid, record);
    },


    setProductRegCombosStore: function (obj, options) {
        this.fireEvent('setProductRegCombosStore', obj, options);
    },

    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
    onshowNewImportExportPOEInspection: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onshowNewImportExportPOEInspection', application_type);
    },
    funcPersonelUserProductSelect:function(cbo, value){
        var form = cbo.up();
            if(value == 2 || value == 4){

                has_presscription = true;
            }
            else{

                has_presscription = false;

            }
            form.down('textfield[name=prescribling_hospital]').setVisible(has_presscription);
            form.down('textfield[name=hospital_address]').setVisible(has_presscription);
            form.down('textfield[name=prescribing_doctor]').setVisible(has_presscription);
            form.down('textfield[name=prescription_no]').setVisible(has_presscription);

    },
    funcAddPermitsProductDetails:function(btn){
        var me = this,
             grid = btn.up('grid'),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            form = Ext.widget(childXtype);
            section_id = grid.down('hiddenfield[name=section_id]').getValue(),
           form.down('textfield[name=permitbrand_name]').setDisabled(false);
           form.down('textfield[name=product_registration_no]').setDisabled(true);
        
           if(section_id == 4){

            form.down('combo[name=product_subcategory_id]').hide();
            form.down('combo[name=device_type_id]').show();
            form.down('textfield[name=product_strength]').hide();
            form.down('combo[name=dosage_form_id]').hide();
       
        }
        else if(section_id == 2){

            form.down('combo[name=product_subcategory_id]').hide();
            form.down('combo[name=device_type_id]').hide();
            form.down('textfield[name=product_strength]').show();
            form.down('combo[name=dosage_form_id]').show();
       
        }
        else if(section == 1){

            form.down('combo[name=product_subcategory_id]').show();
            form.down('combo[name=device_type_id]').hide();
            form.down('textfield[name=product_strength]').show();
            form.down('combo[name=dosage_form_id]').show();
       
            
        }
        else{
            form.down('combo[name=product_subcategory_id]').hide();
            form.down('combo[name=device_type_id]').hide();
            form.down('textfield[name=product_strength]').hide();
            form.down('combo[name=dosage_form_id]').hide();
       
        }
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
    },
    funcPermitsProductRecommendationWin:function(btn){
            var viewXtype = btn.viewXtype,
                winTitle = btn.winTitle,
                winWidth = btn.winWidth,
                grid = btn.up('grid'),
                 form = Ext.widget(viewXtype);  
                 sm = grid.getSelectionModel();
                 if (!sm.hasSelection()) {
                    toastr.warning('Please select at least one product!!', 'Warning Response');
                    return false;
                }
            funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
    },
    onshowNewNarcoticsPermits: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onshowNewNarcoticsPermits', application_type);
    },onshowPersonalUsePermitsDeclaration: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onshowPersonalUsePermitsDeclaration', application_type);
    },

    
    doCreateProductRegParamWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: { model: table },
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.removeAll();
                        store.load();
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },

    addInvoiceCostElement: function (sel, record) {
        var gridView = sel.view,
            selection_grid = gridView.grid,
            panel = gridView.up('drugnewinvoicingpnl'),
            summary_grid = panel.down('productinvoicingcostdetailsgrid'),
            summary_store = summary_grid.getStore(),
            index = summary_store.indexOf(record);
        if (index < 0) {
            summary_store.add(record);
        }
    },
    showAddTcMeetingParticipants: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            pnl = grid.up('panel'),//('newclinicaltrialmanagermeetingpanel'),
            meeting_id = pnl.down('form').down('hiddenfield[name=id]').getValue(),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            childObject;
        if (!meeting_id) {
            toastr.warning('Please save meeting details first!!', 'Warning Response');
            return false;
        }
        childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=meeting_id]').setValue(meeting_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    funcUploadTCMeetingtechnicalDocuments:function(btn){
        var me = this,
        mainTabPnl = btn.up('#contentPanel'),
        containerPnl = mainTabPnl.getActiveTab(),

        grid = btn.up('grid'),
        childXtype = btn.childXtype,
        childXtype= Ext.widget(childXtype),
        winTitle = btn.winTitle,
        winWidth = btn.winWidth,
        document_type_id = btn.document_type_id,
        reference_table_name = btn.reference_table_name,
        table_name = btn.table_name,
        meeting_id = containerPnl.down('hiddenfield[name=id]').getValue();

        if(meeting_id != ''){
            childXtype.down('hiddenfield[name=document_type_id]').setValue(document_type_id);
            childXtype.down('hiddenfield[name=reference_record_id]').setValue(meeting_id);
            childXtype.down('hiddenfield[name=table_name]').setValue(table_name);
            childXtype.down('hiddenfield[name=reference_table_name]').setValue(reference_table_name);

            funcShowCustomizableWindow(winTitle, winWidth, childXtype, 'customizablewindow');
        }
        else{
            toastr.warning('Please save meeting details first!!', 'Warning Response');
            return false;
        }
    },
    onViewImportExportPermitApplication: function (grid, record) {

        this.fireEvent('viewApplicationDetails', record);

    },
    
    onViewPersonalPermitApplication: function (grid, record) {

        this.fireEvent('onViewPersonalPermitApplication', record);

    },
    onViewDeclaredPermitApplication: function (grid, record) {

        this.fireEvent('onViewDeclaredPermitApplication', record);

    },
    funcFilterPermitsdeclarations:function(btn){
            var grid = btn.up('grid'),
                store = grid.store;
                store.removeAll();
                store.load();
    },
    funcClearFilterPermitsdeclarations:function(btn){
        var grid = btn.up('grid'),
            form = grid.down('form'),
            store = grid.store;

            form.reset();
            store.removeAll();
            store.load();
},

    onDblClickregisterednonregisteredprodgrid: function (grid, record) {
       
        var me = this,
            panel = grid.up('panel'),
            product_id = record.get('product_id'),
            brand_name =record.get('brand_name'), 
            section_id =record.get('section_id'), 
            sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue();
            validity_status_id = record.get('validity_status_id'),
            retention_status_id = record.get('retention_status_id'),
            winTitle ='Permit Products Details',
            winWidth = 600,
            childObject = Ext.widget('importexportpermitsproductsfrm');
            childObject.loadRecord(record);

           
            if(sub_module_id == 12 || sub_module_id == 16 ){
                    if(validity_status_id != 2){
                        toastr.error('The product must be registered, confirm the registration status or submit Permit as a special case application .','Product Registration Alert');
                        return;

                    }  else if (retention_status_id == 2) {
                        toastr.error( 'The selected product has a pending retention payment, pay the pending retention or contact Authority for further guidelines.', 'Product Retention Payment Alert');
                        return;
                      } 
            }
            funcShowCustomizableWindow(winTitle, '75%', childObject, 'customizablewindow');

            childObject.down('hiddenfield[name=product_id]').setValue(product_id);
            childObject.down('hiddenfield[name=id]').setValue(0);

            childObject.down('numberfield[name=total_weight]').setVisible(false);
            childObject.down('combo[name=weights_units_id]').setVisible(false);
            if(section_id == 4){

                childObject.down('combo[name=product_subcategory_id]').setVisible(false);
                childObject.down('combo[name=device_type_id]').setVisible(true);
                childObject.down('textfield[name=product_strength]').setVisible(false);
                childObject.down('combo[name=dosage_form_id]').setVisible(false);
           
            }
            else if(section_id == 2 || section_id == 7){

                childObject.down('combo[name=product_subcategory_id]').setVisible(false);
                childObject.down('combo[name=device_type_id]').setVisible(false);
                childObject.down('textfield[name=product_strength]').setVisible(true);
                childObject.down('combo[name=dosage_form_id]').setVisible(true);
                
            }
            else if(section_id == 1){
                
                childObject.down('combo[name=product_subcategory_id]').setVisible(true);
                childObject.down('combo[name=device_type_id]').setVisible(false);
                childObject.down('textfield[name=product_strength]').setVisible(false);
                childObject.down('combo[name=dosage_form_id]').setVisible(false);

                
                childObject.down('numberfield[name=total_weight]').setVisible(true);
                childObject.down('combo[name=weights_units_id]').setVisible(true);
           
            }
            else{
                childObject.down('combo[name=product_subcategory_id]').setVisible(false);
                childObject.down('combo[name=device_type_id]').setVisible(false);
                childObject.down('textfield[name=product_strength]').setVisible(false);
                childObject.down('combo[name=dosage_form_id]').setVisible(false);
           
            }
           
    },
    
    setConfigGridsStore: function (obj, options) {

        this.fireEvent('setConfigGridsStore', obj, options);
    },
    funcSearchImpExpPermit:function(btn){
            var grid = btn.up('grid'),
            permit_no = grid.down('textfield[name=permit_no]').getValue();
            store = grid.store;
            store.removeAll();
            store.load({
                params:{
                    permit_no:permit_no
                }
            });
    },

    setConfigCombosSectionfilterStore: function (obj, options) {

        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },
    setConfigCombosStore: function (obj, options) {

        this.fireEvent('setConfigCombosStore', obj, options);
    },
    setTraderConfigCombosStore: function (obj, options) {
       
        this.fireEvent('setTraderConfigCombosStore', obj, options);
    },
    
    onChangeIsRegulatedProduct:function(cbo, value){
                var frm = cbo.up('form');
                    regulated_prodpermit = frm.down('combo[name=regulated_prodpermit_id]');
                if(value == 1){
                    regulated_prodpermit.setDisabled(false);
                }
                else{
                    regulated_prodpermit.setDisabled(true);
                }


    },
    funcSearchregisterednonregisteredProd:function(btn){
            var grid = btn.up('grid'),
            store = grid.store,
                search_field = grid.down('combo[name=search_field]').getValue(),
                search_value = grid.down('textfield[name=search_value]').getValue();
                        

            store.removeAll();
            store.load({params: {search_field:search_field,search_value:search_value }});


    },
    funcResetregisterednonregisteredProd:function(btn){
        var grid = btn.up('grid'),
        store = grid.store;
                grid.down('combo[name=search_field]').setValue(''),
                grid.down('textfield[name=search_value]').setValue('');
                        

            store.removeAll();
            store.load();

    },

    setConfigCombosProductfilterStore: function (obj, options) {

        this.fireEvent('setConfigCombosProductfilterStore', obj, options);
    },
    filterWorkflowStages: function (cmb, newVal) {
        var grid = cmb.up('grid'),
            stagesField = grid.down('combo[name=workflow_stage_id]'),
            store = stagesField.store,
            containerPnl = grid.up('drugproductregctn'),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            app_type = newVal;
        store.removeAll();
        store.load({ params: { module_id: module_id, section_id: section_id, sub_module_id: app_type } });
    },

    showImportExportPermitRegWorkflow: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('showImportExportPermitRegWorkflow', application_type);
    },

    showImportPermitApplication: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('showImportPermitApplication', application_type);
    },
    onInitiateImportExportApplication: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onInitiateImportExportApplication', application_type,btn);
    },
    //screening 
    onPrevScreeningCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
        motherPnl.getViewModel().set('atEnd', false);
        this.navigateScreeningPnl(btn, wizardPnl, 'prev');
    },
    onNextScreeningCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);

            wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateScreeningPnl(btn, wizardPnl, 'next');
    },
    navigateScreeningPnl: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            max_step = button.max_step,
            motherPnl = wizardPanel,
            model = motherPnl.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());

        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
           
            motherPnl.down('button[name=process_submission_btn]').setVisible(false);
            
            model.set('atBeginning', true);
            model.set('atEnd', false);
        } else if (activeIndex === max_step) {
            motherPnl.down('button[name=process_submission_btn]').setVisible(true);
            model.set('atBeginning', false);
            model.set('atEnd', true);
        } else {
            motherPnl.down('button[name=process_submission_btn]').setVisible(false);
            model.set('atBeginning', false);
            model.set('atEnd', false);
        }
        //wizardPanel.down('button[name=save_btn]').setVisible(false);
    },
    //Receiving Wizard starts
    onPrevCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },

    
    onPrevCardClickReview: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigateReview(btn, wizardPnl, 'prev');
    },
    prevonPrevCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            wizardPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },

    onNextCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            motherPnl = wizardPnl.up('panel');

        motherPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },
    onNextCardClickReview: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            motherPnl = wizardPnl.up('panel');

        motherPnl.getViewModel().set('atBeginning', false);
        this.navigateReview(btn, wizardPnl, 'next');
    },
    onPersonalPermitsNextCardClick:function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            motherPnl = wizardPnl.up('panel');

        motherPnl.getViewModel().set('atBeginning', false);
        this.navigatePersonalPermitsTabs(btn, wizardPnl, 'next');
    },
    onPersonalPermitsPrevCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            wizardPnl.getViewModel().set('atEnd', false);
        this.navigatePersonalPermitsTabs(btn, wizardPnl, 'prev');
    },
    prevonNextCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            
            wizardPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },
    //application_approvalbtn
    getApplicationApprovalDetails: function (item) {

        this.fireEvent('getImportpermitApplicationApprovalDetails', item);

    },
    getPermitReleaseRecommendationDetails: function (item) {

        this.fireEvent('getPermitReleaseRecommendationDetails', item);

    },
    navigateReview: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            max_step = button.max_step,
            motherPnl = wizardPanel,
            model = motherPnl.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());

        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
        if(max_step < 1){
            max_step =3;
        }
        // beginning disables previous
        if (activeIndex === 0) {
            
            model.set('atBeginning', true);
            model.set('atEnd', false);
        } else if (activeIndex === max_step) {
           
            model.set('atBeginning', false);
            model.set('atEnd', true);
        } else {
           
            model.set('atBeginning', false);
            model.set('atEnd', false);
        }
        //wizardPanel.down('button[name=save_btn]').setVisible(false);
    },
   
    navigate: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            max_step = button.max_step,
            motherPnl = wizardPanel,
            panel = motherPnl.up('panel'),
            model = panel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());

        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
        if(max_step < 1){
            max_step =3;
        }
        // beginning disables previous
        if (activeIndex === 0) {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            wizardPanel.down('button[name=save_btn]').setVisible(true);
            if(motherPnl.down('button[name=process_submission_btn]')){
                motherPnl.down('button[name=process_submission_btn]').setVisible(false);
            }
            if(motherPnl.down('button[name=process_submission_btn]')){
                motherPnl.down('button[name=process_submission_btn]').setVisible(false);
            }
            model.set('atBeginning', true);
            model.set('atEnd', false);
        } else if (activeIndex === max_step) {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
            if(motherPnl.down('button[name=process_submission_btn]')){
                motherPnl.down('button[name=process_submission_btn]').setVisible(true);
            }
            if(motherPnl.down('button[name=processreceiving_submission_btn]')){
                motherPnl.down('button[name=processreceiving_submission_btn]').setVisible(true);
            }
            model.set('atBeginning', false);
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            if(motherPnl.down('button[name=process_submission_btn]')){
                motherPnl.down('button[name=process_submission_btn]').setVisible(false);
            }
            if(motherPnl.down('button[name=processreceiving_submission_btn]')){
                motherPnl.down('button[name=processreceiving_submission_btn]').setVisible(false);
            }
            model.set('atBeginning', false);
            model.set('atEnd', false);
        }
        //wizardPanel.down('button[name=save_btn]').setVisible(false);
    },
    quickNavigationonlineprev:function(btn){
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel'),
            progress = wizardPnl.down('#progress_tbar');
            
            wizardPnl.getLayout().setActiveItem(step);
            var layout = wizardPnl.getLayout(),
                item = null,
                i = 0,
                activeItem = layout.getActiveItem();
                
            activeItem.focus();

            if (step === 0) {
               
                motherPnl.down('button[name=submit_btn]').setVisible(true);
                
           //     motherPnl.down('button[name=save_screening_btn]').setVisible(false);
                wizardPnl.getViewModel().set('atBeginning', true);
                wizardPnl.getViewModel().set('atEnd', false);
            } else if (step === 3) {
              
                motherPnl.down('button[name=submit_btn]').setVisible(true);
                
                wizardPnl.getViewModel().set('atBeginning', false);
                wizardPnl.getViewModel().set('atEnd', true);
            } else if(step === 89){
                var reg_status = motherPnl.down('hiddenfield[name=registration_status]').getValue();
                if(reg_status === 2){
                    motherPnl.down('button[name=save_extension_btn]').setVisible(true);
                    motherPnl.down('button[name=save_btn]').setDisabled(true);
                }
                
            }
             else {
               
                motherPnl.down('button[name=submit_btn]').setVisible(true);
                
                wizardPnl.getViewModel().set('atBeginning', false);
                
             //   motherPnl.down('button[name=save_screening_btn]').setVisible(false);
                wizardPnl.getViewModel().set('atEnd', false);
               
            }
    },  showPreviousNonGridPanelUploadedDocs: function (item) {
        this.fireEvent('showPreviousNonGridPanelUploadedDocs', item);
    }, showPrevimportexportPermitreleasegrid: function (btn) {
       
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
            child = Ext.widget(childXtype);

            child.down('hiddenfield[name=active_application_code]').setValue(application_code);
            child.setHeight(450);
           
            funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
    

    },
    showAddLicensePermitProductsWinFrm: function (btn) {
        var mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
           
             me = this,
            grid = btn.up('grid'),
            title = btn.winTitle,
            width = btn.winWidth,
            childXtype = btn.childXtype,
            form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
            form.setHeight(450);
            
            if(application_id < 1){
                toastr.error('Save Application to proceed!!', 'Failure Response');
                return;
            }
            
            containerPnl.getViewModel().set('isShowAddPermitProducts', true);
            funcShowCustomizableWindow(title, '80%', form, 'customizablewindow');
            if (arrayLength > 0) {
                me.fireEvent('refreshStores', storeArray);
            }

    },

    quickDeclarationNavigationonlineprev:function(btn){
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel'),
            progress = wizardPnl.down('#progress_tbar');
            
            wizardPnl.getLayout().setActiveItem(step);
            var layout = wizardPnl.getLayout(),
                item = null,
                i = 0,
                activeItem = layout.getActiveItem();
                
            activeItem.focus();

            if (step === 0) {
               
                motherPnl.down('button[name=submit_btn]').setVisible(true);
                
                wizardPnl.getViewModel().set('atBeginning', true);
                wizardPnl.getViewModel().set('atEnd', false);
                
            } else if (step === 3) {
              
                motherPnl.down('button[name=submit_btn]').setVisible(true);
                
                wizardPnl.getViewModel().set('atBeginning', false);
                wizardPnl.getViewModel().set('atEnd', true);
                
            } 
             else {
               
                motherPnl.down('button[name=submit_btn]').setVisible(true);
                
                wizardPnl.getViewModel().set('atBeginning', false);
                
                wizardPnl.getViewModel().set('atEnd', false);
               
            }
    },onChangeControlledDrugType:function(cbo, value){
        var frm = cbo.up('form'),
        controlled_drugssubstancesStr = frm.down("combo[name=controlled_drugssubstances_id]").getStore();
        filter = {
            controlleddrug_type_id: value
        };
        filter = JSON.stringify(filter);
        controlled_drugssubstancesStr.removeAll();
        controlled_drugssubstancesStr.load({params:{filters:filter}});
        this.funcDrugsContentsCalculations(cbo);

    },funcDrugsContentsCalculations:function(cmponent){
        var frm = cmponent.up('form'),
        table_name = 'par_controlleddrugsconv_factorsconfig',
        controlleddrugs_type_id = frm.down('combo[name=controlleddrugs_type_id]').getValue(),
        controlled_drugssubstances_id = frm.down('combo[name=controlled_drugssubstances_id]').getValue(),
        controlleddrugs_basesalt_id = frm.down('combo[name=controlleddrugs_basesalt_id]').getValue();
        if(controlleddrugs_type_id > 0 && controlled_drugssubstances_id > 0 && controlleddrugs_basesalt_id > 0){
            Ext.Ajax.request({
                url: 'importexportpermits/funcDrugsContentsCalculations',
                method: 'GET',
                params: {
                    table_name: table_name,
                    controlleddrugs_type_id:controlleddrugs_type_id,
                    controlled_drugssubstances_id:controlled_drugssubstances_id,
                    controlleddrugs_basesalt_id:controlleddrugs_basesalt_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        appr_pureanhydrousdrug_contents= resp.appr_pureanhydrousdrug_contents;
                    if (appr_pureanhydrousdrug_contents >0) {
                        toastr.success(message, 'Success Response');
                        //frm.down('numberfield[name=drugs_content]').setReadOnly(true);
                        frm.down('numberfield[name=drugs_content]').setValue(appr_pureanhydrousdrug_contents);
                    }
                    else{
                        toastr.success('The Drugs Contents(%) has not been configured for the selected product, enter Drugs Contents(%) ', 'Alert');
                        frm.down('numberfield[name=drugs_content]').setReadOnly(false);
                        frm.down('numberfield[name=drugs_content]').setValue(appr_pureanhydrousdrug_contents);
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
                }
            });

        }
        
},
baseStrengthCalculation:function(text){
    var frm = text.up('form'),
        quantity = frm.down('numberfield[name=quantity]').getValue(),
        strength_asgrams = frm.down('numberfield[name=strength_asgrams]').getValue(),
        drugs_content = frm.down('numberfield[name=drugs_content]').getValue(),
        controlleddrug_base =quantity*strength_asgrams*drugs_content/100;
        frm.down('numberfield[name=controlleddrug_base]').setValue(controlleddrug_base);
    
},
funcChangeProductStrength:function(text){
    var frm = text.up('form');
    
    frm.down('combo[name=gramsbasesiunit_id]').setValue();
},
funcChangeProductStrengthUnits:function(cbo, record){
    var conversion_unit = record.get('conversion_unit'),
        frm = cbo.up('form');
        frm.down('hiddenfield[name=conversion_unit]').setValue(conversion_unit);
        
    this.calculateProductStrengthinGrams(frm);
},  
calculateProductStrengthinGrams:function(frm){
    var product_strength = frm.down('numberfield[name=product_strength]').getValue(),
    pack_unit = frm.down('numberfield[name=pack_unit]').getValue(),
    conversion_unit = frm.down('hiddenfield[name=conversion_unit]').getValue();
    
    if(product_strength >0){
        
      frm.down('numberfield[name=strength_asgrams]').setValue(product_strength/conversion_unit*pack_unit);
      this.baseStrengthCalculation();
      
    }else{
        frm.down('numberfield[name=strength_asgrams]').setValue();
        frm.down('numberfield[name=product_strength]').setValue(); 
        frm.down('numberfield[name=conversion_unit]').setValue();
        toastr.error('Enter the Product Strength, and proceed.','Alert');
    }
},
quickNavigationReview: function (btn) {
    var step = btn.step,
        wizard = btn.wizard,
        wizardPnl = btn.up(wizard);
       
        motherPnl = wizardPnl;
        application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
        progress = wizardPnl.down('#progress_tbar'),
        progressItems = progress.items.items;

    if (step > 1) {
        var thisItem = progressItems[step];
        if (!application_id) {
            thisItem.setPressed(false);
            toastr.warning('Please save application details first!!', 'Warning Response');
            return false;
        }
    }
    if (step == 0) {
        motherPnl.getViewModel().set('atBeginning', true);
        motherPnl.getViewModel().set('atEnd', false);
       
    } else if (step == 3) {
        
        motherPnl.getViewModel().set('atBeginning', false);
        motherPnl.getViewModel().set('atEnd', true);
       
    } else {
        motherPnl.getViewModel().set('atBeginning', false);
        motherPnl.getViewModel().set('atEnd', false);
       
    }


    wizardPnl.getLayout().setActiveItem(step);
    var layout = wizardPnl.getLayout(),
        item = null,
        i = 0,
        activeItem = layout.getActiveItem();

    for (i = 0; i < progressItems.length; i++) {
        item = progressItems[i];

        if (step === item.step) {
            item.setPressed(true);
        }
        else {
            item.setPressed(false);
        }

        if (Ext.isIE8) {
            item.btnIconEl.syncRepaint();
        }
    }
    activeItem.focus();
},quickScreeningNavigation: function (btn) {
    var step = btn.step,
        wizard = btn.wizard,
        max_step = btn.max_step,
        wizardPnl = btn.up(wizard);
        panel = wizardPnl,
        motherPnl = wizardPnl;
        application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
        progress = wizardPnl.down('#progress_tbar'),
        progressItems = progress.items.items;

    if (step > 1) {
        var thisItem = progressItems[step];
        if (!application_id) {
            thisItem.setPressed(false);
            toastr.warning('Please save application details first!!', 'Warning Response');
            return false;
        }
    }
    if (step == 0) {
        motherPnl.down('button[name=save_btn]').setDisabled(false);
        panel.getViewModel().set('atBeginning', true);
        panel.getViewModel().set('atEnd', false);
         wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
        
    } else if (step == max_step) {
        
        motherPnl.down('button[name=save_btn]').setDisabled(false);
        panel.getViewModel().set('atBeginning', false);
        panel.getViewModel().set('atEnd', true);
      
            wizardPnl.down('button[name=process_submission_btn]').setVisible(true);
        
    } else {
        panel.getViewModel().set('atBeginning', false);
        panel.getViewModel().set('atEnd', false);
        wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
        
    }
    wizardPnl.getLayout().setActiveItem(step);
    var layout = wizardPnl.getLayout(),
        item = null,
        i = 0,
        activeItem = layout.getActiveItem();

    for (i = 0; i < progressItems.length; i++) {
        item = progressItems[i];

        if (step === item.step) {
            item.setPressed(true);
        }
        else {
            item.setPressed(false);
        }

        if (Ext.isIE8) {
            item.btnIconEl.syncRepaint();
        }
    }
    activeItem.focus();
},
    quickNavigation: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            max_step = btn.max_step,
            wizardPnl = btn.up(wizard);
            
            motherPnl = wizardPnl;
            panel = motherPnl.up('panel'),
            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;

        if (step > 1) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            motherPnl.down('button[name=save_btn]').setDisabled(false);
            panel.getViewModel().set('atBeginning', true);
            panel.getViewModel().set('atEnd', false);
            if(wizardPnl.down('button[name=prechecking_recommendation]')){

                wizardPnl.down('button[name=prechecking_recommendation]').setVisible(false);
            }
          
            if(wizardPnl.down('button[name=process_submission_btn]')){
                wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
            }
        } else if (step == max_step) {
            
            motherPnl.down('button[name=save_btn]').setDisabled(false);
            panel.getViewModel().set('atBeginning', false);
            panel.getViewModel().set('atEnd', true);
            if(wizardPnl.down('button[name=prechecking_recommendation]')){

                wizardPnl.down('button[name=prechecking_recommendation]').setVisible(true);
            }
          
            if(wizardPnl.down('button[name=process_submission_btn]')){
                wizardPnl.down('button[name=process_submission_btn]').setVisible(true);
            }
        } else {
            panel.getViewModel().set('atBeginning', false);
            panel.getViewModel().set('atEnd', false);
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            if(wizardPnl.down('button[name=prechecking_recommendation]')){

                wizardPnl.down('button[name=prechecking_recommendation]').setVisible(false);
            }
          
            if(wizardPnl.down('button[name=process_submission_btn]')){
                wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
            }
        }


        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },
    quickPersonalUseNavigation:function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
           
            if(wizardPnl.up('panel')){
                motherPnl = wizardPnl.up('panel');

            }
            else{
                motherPnl = wizardPnl;

            }
            
            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;

        if (step > 1) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', true);
        } else if (step == 1) {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', false);
            motherPnl.getViewModel().set('atEnd', true);
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
        }


        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },
    quickNavigationPOE: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
           
            if(wizardPnl.up('panel')){
                motherPnl = wizardPnl.up('panel');

            }
            else{
                motherPnl = wizardPnl;

            }
            
            application_id = motherPnl.down('hiddenfield[name=active_application_code]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;

            if(application_id == ''){
               
                toastr.error('Search Import/Export Permit Application before you proceed for inspection!!', 'Failure');
                return;
            } 
        if (step ==1) {
            var thisItem = progressItems[step];
            
        }
        if (step == 0) {
            motherPnl.getViewModel().set('atBeginning', true);
            motherPnl.getViewModel().set('atEnd', false);
           
            wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
            
        } else if (step == 1) {
            motherPnl.getViewModel().set('atBeginning', true);
            motherPnl.getViewModel().set('atEnd', true);
           
            wizardPnl.down('button[name=process_submission_btn]').setVisible(true);
            
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
            motherPnl.getViewModel().set('atEnd', false);
           
        }


        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },
    prevquickNavigation: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            motherPnl = wizardPnl;

            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;

        if (step > 1) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            motherPnl.getViewModel().set('atBeginning', true);
        } else if (step == 1) {
            motherPnl.getViewModel().set('atBeginning', false);
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
        }

        if (step === 1) {
            motherPnl.getViewModel().set('atEnd', true);

        } else {
            motherPnl.getViewModel().set('atEnd', false);
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },
    // Receiving wizard ends

    
   
    printPreviewPermitForApproval:function(btn){
        var me = this,
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),

            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            application_code = containerPnl.down('hiddenfield[name=application_code]').getValue();
            this.fireEvent('generateImportExportpermit', application_code,module_id,'Print Review Import/Export Permit');
    },
    /*
    var rec = grid.getStore().getAt(rowIndex),
    reference_no = rec.get('reference_no'),
    id = rec.get('id');

*/
downloadPreviousDocupload: function (item) {
    var record = item.getWidgetRecord(),
        reference_no = record.get('reference_no'),
        id = record.get('id'),
        section = record.get('section');
        var redirect =  'https://imis.tmda.go.tz/mis/index.php/online_portal/get_OnlineDocument?id=' + id + '&section=' + section + '&reference_no=' + reference_no;
        print_report(redirect);
},

    generateImportExportPermit: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code');
            module_id = record.get('module_id');
            this.fireEvent('generateImportExportpermit', application_code,module_id,'');
            
    },
    
    generateNarcoticImportPermit: function (item) {
        var record = item.getWidgetRecord(),
             application_code = record.get('application_code');
            module_id = record.get('module_id');
            this.fireEvent('generateNarcoticImportPermit', application_code,module_id,'');
            
    },
    generateColumnImportExportPermit: function (item) {
        var record = item.getWidgetRecord(),
            application_code = record.get('application_code');
            module_id = record.get('module_id');
            this.fireEvent('generateImportExportpermit', application_code,module_id,'');
            
    },
    func_loadSystemGeneratedDocs: function(btn){
        var form=btn.up('form'),
            grid = Ext.widget(btn.gridXtype),
            ref = form.down('hiddenfield[name=reference_no]').getValue(),
            doc_type = 29;
  
        grid.down('textfield[name=reference_no]').setValue(ref);
        grid.down('hiddenfield[name=module_id]').setValue(4);
        grid.down('combo[name=doc_type]').setValue(doc_type);
        
        funcShowCustomizableWindow('Applications Receipts', '60%', grid, 'customizablewindow');
  
  
      },
    generateimportpermitfromfrm: function (btn) {
        var  frm  = btn.up('form'),
            application_code = frm.down('hiddenfield[name=application_code]').getValue();

            this.fireEvent('generateImportExportpermit', application_code,4,'');
            
    },
    getPermitReleaseRecommendationDetails: function (item) {
        
        var btn = item.up('button'),
             record = btn.getWidgetRecord();

        this.fireEvent('getPermitReleaseRecommendationDetails', record,item);

    },previewUploadedDocument: function (item) {
        var grid = item.up('grid'),
             download = item.download
            record = item.getWidgetRecord(),
            node_ref = record.get('node_ref'),
            application_code = record.get('application_code'),
            uploadeddocuments_id = record.get('uploadeddocuments_id');
            
            if(node_ref != ''){
    
                this.functDownloadAppDocument(node_ref,download,application_code,uploadeddocuments_id, grid);
            }
            else{
                toastr.error('Document Not Uploaded', 'Failure Response');
            }
            
    },

    functDownloadAppDocument:function(node_ref,download,application_code,uploadeddocuments_id=null, grid){
        //get the document path 
        if(grid != ''){

            grid.mask('Document Preview..');
        }
      
        Ext.Ajax.request({
            url: 'documentmanagement/getApplicationDocumentDownloadurl',
            method: 'GET',
            params: {
                node_ref: node_ref,
                application_code:application_code,
                uploadeddocuments_id:uploadeddocuments_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                Ext.getBody().unmask();
                               var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
                document_url = resp.document_url;
                filename = resp.filename;
                if (success == true || success === true) {
                    var a = document.createElement("a");
                    a.href = document_url; 
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    grid.unmask();
                } else {
                    grid.unmask();
                    toastr.error(resp.message, 'Failure Response');
                }
                    
            },
            failure: function (response) {
                grid.unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error downloading data: ' + errorThrown, 'Error Response');
            }
        });


},


    generateHospitalNarcoticsPermit: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code');
            module_id = record.get('module_id');
            this.fireEvent('printHospitalNarcoticsPermit', application_code,module_id,'');
            
    },
    printHospitalNarcoticsPermit: function (item) {
        var record = item.getWidgetRecord(),
            application_code = record.get('application_code');
            module_id = record.get('module_id');
            this.fireEvent('printHospitalNarcoticsPermit', application_code,module_id,'');
    },
    funcConsignementInspectionDetails:function(item){
        var record = item.getWidgetRecord(),
        grid = item.up('grid'),
        store = grid.store,
       
        inspectionbooking_id = record.get('inspectionbooking_id');
        tab_id = inspectionbooking_id+'inspection';
        inspectionbookingstatus = record.get('inspectionbookingstatus'),
        inspectionbooking_status_id = record.get('inspectionbooking_status_id');
        
        application_code = record.get('application_code');
        if(inspectionbooking_status_id != 1){
           //new tab
           mainTabPnl = item.up('#contentPanel');
           containerPnl = mainTabPnl.getActiveTab();
           var TabToCheck = mainTabPnl.items.find(function(i) {
            if (i.id.indexOf(tab_id) != -1) {
                return true
            } else {
                return false;
            }
        });
        if (!TabToCheck) {
            mainTabPnl.add({
                title: 'Declaration Consignment Inspection Details',
                closable: true,
                id: tab_id,
                xtype: 'declaredpoeinspectionsdetails'
            });
        }
        mainTabPnl.setActiveTab(tab_id);
          // mainTabPnl.add();
          this.mapDeclaredPermitsInspectionDetails(reference_no,mainTabPnl);

        }
        else{
            toastr.error('Inspection Booking Permit not confirmed and currently under '+inspectionbookingstatus+',Confirm to proceed with the Inspection Process', 'Failure Response');

        }
    },
    mapDeclaredPermitsInspectionDetails:function(reference_no,mainTabPnl,){
        containerPnl = mainTabPnl.getActiveTab();
        importexportdetailsfrm = containerPnl.down('#importexportdetailsfrm'),
        senderreceiverdetailsfrm = containerPnl.down('#senderreceiverdetailsfrm'),
        poeinspectionpermitsproductsgrid = containerPnl.down('#poeinspectionpermitsproductsgrid'),
        importexportpermitsproductsgrid = containerPnl.down('declaredimportexportpermitsproductsgrid'),
        
        poe_application_id = containerPnl.down('hiddenfield[name=poe_application_id]').getValue();
      if(poe_application_id != ''){
            
            toastr.error('Application has already Been Saved, enter/verify inspection details and proceed!!', 'Failure Response');
            return;
        }
        //activeTab
        Ext.getBody().mask('loading...');
        Ext.Ajax.request({
            method: 'GET',
            url: 'importexportpermits/getImportExportApprovedPermitDetails',
            params: {
                permit_no: reference_no,
                section_id:2
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                   
                if (success == true || success === true) {
                    
                    var  results = resp.results,
                     is_permitexpired = results.is_permitexpired,
                     permit_verificationstatus_id = results.permit_verificationstatus_id,

                        senderReceiverDetails = resp.senderReceiverDetails,
                        premisesDetails = resp.premisesDetails,
                        zone_id = results.zone_id,
                        model = Ext.create('Ext.data.Model', results);
                        senderReceiverDetails = Ext.create('Ext.data.Model', senderReceiverDetails);
                        if(is_permitexpired == 1){
                            toastr.error('The selected permit has already Expired, kindly reject or request for permit Extension.', 'Alert');
                            Ext.getBody().unmask();
                            return;
                        }
                        if(permit_verificationstatus_id > 0){
                            toastr.error('The selected permit has already been verified, kindly confirm on the inspection detail and released consignment details permit Extension.', 'Alert');
                         //   return;
                        }
                        containerPnl.down('displayfield[name=verification_status]').setValue(results.verification_status);
                        containerPnl.down('displayfield[name=permit_expiry_date]').setValue(results.expiry_date);
                        
                    importexportdetailsfrm.loadRecord(model);

                    senderreceiverdetailsfrm.loadRecord(senderReceiverDetails);

                    zone_cbo.setValue(zone_id);

                    containerPnl.down('displayfield[name=application_status]').setValue(results.application_status);

                    containerPnl.down('displayfield[name=reference_no]').setValue(results.reference_no);
                    containerPnl.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                    containerPnl.down('hiddenfield[name=active_application_code]').setValue(results.application_code);
                    poeinspectionpermitsproductsgrid.store.load();
                    importexportpermitsproductsgrid.store.load();
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response');
                }
                Ext.getBody().unmask();
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });

    },
    funcConfirmInspectionBooking:function(item){

        var record = item.getWidgetRecord(),
            grid = item.up('grid'),
            store = grid.store,
            inspectionbooking_id = record.get('inspectionbooking_id');
            inspectionbookingstatus = record.get('inspectionbookingstatus'),
            inspectionbooking_status_id = record.get('inspectionbooking_status_id');
            
                application_code = record.get('application_code');
                if(inspectionbooking_status_id ==1){
                    Ext.MessageBox.confirm('Confirm Permit Booking', 'Are you sure to confirmed the Inspection Booking?', function (btn) {
                        if (btn === 'yes') {
                            Ext.getBody().mask('Confirming Inspection Booking...');
                            Ext.Ajax.request({
                                url: 'api/tesws/confirmInspectionBookings',
                                method:'GET',
                                params: {
                                    inspectionbooking_id: inspectionbooking_id,
                                    application_code: application_code,
                                    _token: token
                                },
                                success: function (response) {
    
                                    var resp = Ext.JSON.decode(response.responseText),
                                        success = resp.success,
                                        message = resp.message;
                                        
                                    if (success == true || success === true) {
                                        toastr.success(message, 'Success Response');
                                    } else {
                                        toastr.error(message, 'Failure Response');
                                    }
                                    Ext.getBody().unmask();
                                    store.load();
    
                                },
                                failure: function (response) {
                                    btn.setLoading(false);
                                    var resp = Ext.JSON.decode(response.responseText),
                                        message = resp.message;
                                    toastr.error(message, 'Failure Response');
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    btn.setLoading(false);
                                    toastr.error('Error: ' + errorThrown, 'Error Response');
                                }
                            });
    
    
                        }
                    });
                    
                }
                else{
    
                    toastr.error('Inspection Booking Permit has already been confirmed and currently under '+inspectionbookingstatus+', Contact the system admin for any enquiry', 'Failure Response');
    
                }
    },
    funcProcessPermitDeclaration:function(item){
        var record = item.getWidgetRecord(),
        grid = item.up('grid'),
        store = grid.store,
            permit_declaration_id = record.get('permit_declaration_id');
            permitsubmission_status = record.get('permitsubmission_status'),
            permitsubmission_status_id = record.get('permitsubmission_status_id');
            application_code = record.get('application_code');
            if(permitsubmission_status_id ==1 || permitsubmission_status_id <1){
                Ext.MessageBox.confirm('Process Permit', 'Are you sure to initiate the Declared Permit Processing ?', function (btn) {
                    if (btn === 'yes') {
                        Ext.getBody().mask('Processing Permit...');

                        Ext.Ajax.request({
                            url: 'api/tesws/processDeclaredImportExportapps',
                            method:'GET',
                            params: {
                                permit_declaration_id: permit_declaration_id,
                                stage_application_codeid: application_code,
                                _token: token
                            },
                            success: function (response) {

                                var resp = Ext.JSON.decode(response.responseText),
                                    success = resp.success,
                                    message = resp.message;
                                    
                                if (success == true || success === true) {
                                    toastr.success(message, 'Success Response');
                                } else {
                                    toastr.error(message, 'Failure Response');
                                }
                                Ext.getBody().unmask();
                                store.load();

                            },
                            failure: function (response) {
                                btn.setLoading(false);
                                var resp = Ext.JSON.decode(response.responseText),
                                    message = resp.message;
                                toastr.error(message, 'Failure Response');
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                btn.setLoading(false);
                                toastr.error('Error: ' + errorThrown, 'Error Response');
                            }
                        });


                    }
                });
                

            }
            else{

                toastr.error('Declared Permit has already been proceed and currently under '+permitsubmission_status+', Contact the system admin for any enquiry', 'Failure Response');

            }
    },
    editpreviewPermitinformation: function (item) {
        this.fireEvent('editpreviewPermitinformation', item);
    },
    editpreviewPermitQueryinformation: function (grid,record) {
        this.fireEvent('editpreviewPermitQueryinformation', grid,record);
    },

    funcPremisesValidationrecommendation: function (item) {
        var record = item.getWidgetRecord(),
             application_code = record.get('application_code');
             module_id = record.get('module_id');
      
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            child = Ext.widget(childXtype);
            child.down('hiddenfield[name=application_code]').setValue(application_code);

            child.down('hiddenfield[name=active_application_code]').setValue(application_code);

            if(child.down('importexportproductsvalidationfrm')){
                child.down('importexportproductsvalidationfrm').down('hiddenfield[name=application_code]').setValue(application_code);
            }
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
   
},
    //
    saveApplicationScreeningDetails1: function (btn) {
        btn.setLoading(true);
        var me = this,
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),

            process_id = containerPnl.down('hiddenfield[name=process_id]').getValue(),
            stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            screeningGrid = wizardPnl.down('drugproductscreeninggrid'),
            checklist_type = screeningGrid.down('combo[name=applicable_checklist]').getValue(),
            store = screeningGrid.getStore(),
            params = [];
        for (var i = 0; i < store.data.items.length; i++) {
            var record = store.data.items[i],
                checklist_item_id = record.get('id'),
                response = record.get('response'),
                pass_status = record.get('pass_status'),
                comment = record.get('comment');
            if (pass_status == true || pass_status === true) {
                pass_status = 1;
            } else {
                pass_status = 0;
            }
            var obj = {
                process_id: process_id,
                stage_id: stage_id,
                created_by: user_id,
                checklist_item_id: checklist_item_id,
                response: response,
                pass_status: pass_status,
                comment: comment
            };
            //if (record.dirty) {
            params.push(obj);
            //}
        }
        params = JSON.stringify(params);
        Ext.Ajax.request({
            url: 'productregistration/saveNewReceivingScreeningDetails',
            params: {
                process_id: process_id,
                stage_id: stage_id,
                checklist_type: checklist_type,
                screening_details: params,
                _token: token
            },
            success: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    store.load();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                btn.setLoading(false);
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    saveApplicationScreeningDetails: function (btn) {
        btn.setLoading(true);
        var mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
            screeningGrid = containerPnl.down('productscreeninggrid'),
            checklist_type = screeningGrid.down('combo[name=applicable_checklist]').getValue(),
            store = screeningGrid.getStore(),
            params = [];
        for (var i = 0; i < store.data.items.length; i++) {
            var record = store.data.items[i],
                checklist_item_id = record.get('id'),
                pass_status = record.get('pass_status'),
                comment = record.get('comment'),
                item_resp_id = record.get('item_resp_id');
            var obj = {
                application_id: application_id,
                application_code: application_code,
                item_resp_id: item_resp_id,
                created_by: user_id,
                checklist_item_id: checklist_item_id,
                pass_status: pass_status,
                comment: comment
            };
            if (record.dirty) {
                params.push(obj);
            }
        }
        if (params.length < 1) {
            btn.setLoading(false);
            toastr.warning('No records to save!!', 'Warning Response');
            return false;
        }
        params = JSON.stringify(params);
        Ext.Ajax.request({
            url: 'premiseregistration/saveApplicationChecklistDetails',
            params: {
                application_id: application_id,
                application_code: application_code,
                checklist_type: checklist_type,
                screening_details: params
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    store.load();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                btn.setLoading(false);
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    setUserCombosStore: function (obj, options) {
        this.fireEvent('setUserCombosStore', obj, options);
    },
    setParamCombosStore: function (obj, options) {
        this.fireEvent('setParamCombosStore', obj, options);
    },
    setAdminGridsStore: function (obj, options) {
        this.fireEvent('setAdminGridsStore', obj, options);
    }, funcAddProductApplicationParamter:function(btn){
        var childXtype = btn.childXtype,
            section_id = btn.section_id,
            table_name = btn.table_name,
            childXtype = Ext.widget(childXtype);
            childXtype.down('hiddenfield[name=section_id]').setValue(section_id);

        funcShowCustomizableWindow('Parameter', '55%', childXtype, 'customizablewindow');
    },funcAddApplicationParamter:function(btn){
        var childXtype = btn.childXtype,
            table_name = btn.table_name,
            childXtype = Ext.widget(childXtype);

        funcShowCustomizableWindow('Parameter', '75%', childXtype, 'customizablewindow');
    },

    showPersonalPermitProductsWinFrm: function (btn) {
        var mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
             me = this,
            grid = btn.up('grid'),
            title = btn.winTitle,
            width = btn.winWidth,
            childXtype = btn.childXtype,
            form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
            
            if(application_id < 1){
                toastr.error('Save Application to proceed!!', 'Failure Response');
                return;
            }
        funcShowCustomizableWindow(title, '45%', form, 'customizablewindow');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }

    },

    showAddImpPermitProductsWinFrm: function (btn) {
        var mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),   
            sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
             me = this,
            grid = btn.up('grid'),
            title = btn.winTitle,
            width = btn.winWidth,
            childXtype = btn.childXtype,
            form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
            form.setHeight(450);

            if(application_id < 1){
                toastr.error('Save Application to proceed!!', 'Failure Response');
                return;
            }
            if(sub_module_id == 13 || sub_module_id == 14  || sub_module_id == 15 || sub_module_id == 16){
                form.down('button[name=btn_addproducts]').setVisible(true);
            }
            else{
                form.down('button[name=btn_addproducts]').setVisible(false);

            }
            form.down('hiddenfield[name=section_id]').setValue(section_id);
            form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            
        funcShowCustomizableWindow(title, '80%', form, 'customizablewindow');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }

    },


    showApplicationQueriesWin: function (widgetColumn) {
        var record = widgetColumn.getWidgetRecord(),
            grid = Ext.widget('applicationqueriesgrid'),
            checklist_item = record.get('name'),
            item_resp_id = record.get('item_resp_id');
        grid.down('hiddenfield[name=item_resp_id]').setValue(item_resp_id);
        funcShowCustomizableWindow(checklist_item + ' - Queries', '75%', grid, 'customizablewindow');
    },

    showAddApplicationQueryForm: function (btn) {
        var form = Ext.widget('applicationqueryfrm'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            item_resp_id = grid.down('hiddenfield[name=item_resp_id]').getValue(),
            win = grid.up('window');
        form.down('hiddenfield[name=item_resp_id]').setValue(item_resp_id);
        form.setHeight(height);
        grid.hide();
        win.add(form);
    },

    showEditApplicationQueryForm: function (item) {
        var btn = item.up('button'),
            grid = btn.up('grid'),
            height = grid.getHeight(),
            record = btn.getWidgetRecord(),
            form = Ext.widget('applicationqueryfrm'),
            win = grid.up('window');
        form.loadRecord(record);
        form.setHeight(height);
        grid.hide();
        win.add(form);
    },

    backToApplicationQueriesGrid: function (btn) {
        var form = btn.up('form'),
            win = form.up('window'),
            grid = win.down('grid');
        win.remove(form, true);
        grid.show();
    },

    saveApplicationQuery: function (btn) {
        var me = this,
            form = btn.up('form'),
            win = form.up('window'),
            store = win.down('grid').getStore(),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: 'productregistration/saveProductRegCommonData',
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.load();
                        me.backToApplicationQueriesGrid(btn);
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }

    },

    showReceivingApplicationSubmissionWin: function (btn) {

        this.fireEvent('showLicenseImpExpReceivingApplicationSubmissionWin', btn);
    },
    showSamplerecApplicationSubmissionWin: function (btn) {

        this.fireEvent('showSamplerecApplicationSubmissionWin', btn);
    },
    funcOnChangePermitCategory:function(cbo,value){
        this.fireEvent('funcOnChangePermitCategory', cbo,value);
       
    },
    showAddPermitRegParamWinFrm: function (btn) {
        // if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;

        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
    },
    showApplicationEvaluationUploads: function (btn) {
        this.fireEvent('showApplicationEvaluationUploads', btn);
       
    },

    showSampleAnalysisrequestswin: function (btn) {
  
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            isWin = btn.isWin,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            product_id = containerPnl.down('hiddenfield[name=product_id]').getValue(),
            application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            reference_no = containerPnl.down('displayfield[name=reference_no]').getValue(),
            
            arrayLength = storeArray.length;
            child.setHeight(600);
       
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        //set values 
        child.down('hiddenfield[name=application_code]').setValue(application_code);
        child.down('hiddenfield[name=section_id]').setValue(section_id);
        child.down('hiddenfield[name=module_id]').setValue(module_id);
        child.down('hiddenfield[name=misproduct_id]').setValue(product_id);
        
        child.down('hiddenfield[name=code_ref_no]').setValue(reference_no);
        
        child.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        
    },
    showAddMeetingAttendeeFrm: function (btn) {
        var me = this,
            win = Ext.widget('meetingattendeefrm');
        funcShowCustomizableWindow("Add Member", 400, win, 'customizablewindow');
    },
    addMember: function (btn) {
        var me = this,
            grid = Ext.ComponentQuery.query('productmeetingdetailsfrm grid')[0],
            form = btn.up('form'),
            store = grid.getStore(),
            cnt = store.getCount();
        if (cnt === 0) {
            store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                fields: [{
                    name: 'selected',
                    type: 'boolean',
                    defaultValue: false
                }, {
                    name: 'member_name',
                    type: 'string'
                }]
            });
        }
        form = form.getForm();
        store.add({
            member_name: form.getValues().name
        });
        grid.setStore(store);
    },
    removeMembers: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            store = grid.getStore(),
            items = store.getData().items;
        var remainingItems = [];
        for (var i = 0; i < items.length; i++) {
            if (!items[i].getData().selected) {
                remainingItems.push(items[i].getData());
            }
        }
        store.setData(remainingItems);
    },
    backToFrm: function (btn) {
        var me = this,
            form = btn.up('form'),
            // main_tabPanel = form.up('#contentPanel'),
            activeTab = form.up('panel'),//main_tabPanel.getActiveTab(),
            routeId = activeTab.routeId,
            frmWidget = btn.frm,
            frm = activeTab.down(frmWidget);
        activeTab.remove(form);
        if (frm) {
            frm.show();
        } else {
            activeTab.close();
        }
    },

    // Meeting Details wizard start

    onPreviousClickMeeting: function (btn) {
        var wizardPnl = btn.up('newdrugapprovalswizard'),
            motherPnl = wizardPnl.up('newdrugapprovals');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigateMeeting(btn, wizardPnl, 'prev');
    },

    onNextClickMeeting: function (btn) {
        var wizardPnl = btn.up('newdrugapprovalswizard'),
            motherPnl = wizardPnl.up('newdrugapprovals');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigateMeeting(btn, wizardPnl, 'next');
    },

    navigateMeeting: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('newdrugapprovals'),
            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
            model = motherPnl.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());

        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            // IE8 has an odd bug with handling font icons in pseudo elements;
            // it will render the icon once and not update it when something
            // like text color is changed via style addition or removal.
            // We have to force icon repaint by adding a style with forced empty
            // pseudo element content, (x-sync-repaint) and removing it back to work
            // around this issue.
            // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
            // and this: https://github.com/twbs/bootstrap/issues/13863
            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },


    // Meeting Details wizard start
    saveMeeting: function (btn) {
        var me = this,
            wizardPnl = btn.up('newdrugapprovalswizard'),
            motherPnl = wizardPnl.up('newdrugapprovals'),
            form = wizardPnl.down('form'),
            meetingDetails = form.getForm().getValues(),
            grid = wizardPnl.down('grid[itemId=meetingMembers]'),
            store = grid.getStore(),
            items = store.getData().items;

        var remainingItems = [];
        for (var i = 0; i < items.length; i++) {
            if (!items[i].getData().selected) {
                remainingItems.push(items[i].getData().member_name);
            }
        }
        meetingDetails.members = remainingItems;
        this.fireEvent('doSubmitData',
            meetingDetails,
            null,
            "POST",
            "productregistration/saveMeeting",
            function (data) {
                var meetingBtn = wizardPnl.down("*[name=meeting_next_btn]").setDisabled(false);
            });
    }, savePermitInformation: function (btn) {

        this.fireEvent('savePermitInformation', btn);

    },

    reloadParentGridOnChange: function (combo) {
        var grid = combo.up('grid'),
            store = grid.getStore();
        store.load();
    },

    funcActiveProductsOtherInformationTab: function (tab) {

        this.fireEvent('funcActiveProductsOtherInformationTab', tab);

    },
    
    showAddProductOtherdetailsWinFrm: function (btn) {
        this.fireEvent('showAddProductOtherdetailsWinFrm', btn);
    },
   
    saveproductOtherdetails: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            product_id = form.down('hiddenfield[name=product_id]').getValue(),
            win = form.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();

        if (frm.isValid()) {
            frm.submit({
                url: url,
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.removeAll();
                        store.load({ params: { product_id: product_id } });
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },

    doDeletePermitOtherdetails: function (item) {
        //if (this.fireEvent('checkFullAccess')) { funcProcessPermitDeclaration
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            store = Ext.getStore(storeID),
            table_name = item.table_name,
            url = item.action_url;
        Ext.MessageBox.confirm('Delete', 'Are you sure to perform this action ?', function (btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('Deleting record...');

                Ext.Ajax.request({
                    url: url,
                    method: 'POST',
                    params: {
                        table_name: table_name,
                        id: id
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message,
                            success = resp.success;
                        if (success == true || success === true) {
                            toastr.success(message, 'Success Response');
                            store.removeAll();
                            store.load();
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
                    }
                });
            } else {
                //
            }
        });
    },
    funcSearchProductManufacturer: function (btn) {
        var childXtype = btn.childXtype,
            me = this,
            win = btn.up('window'),
            title = btn.winTitle
        form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;


        funcShowCustomizableWindow(title, '80%', form, 'customizablewindow');
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }

    }, funcSearchProductManufacturerfrm: function (btn) {
        var childXtype = btn.childXtype,
            me = this,
            win = btn.up('window'),
            title = btn.winTitle
        form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;


        funcShowCustomizableWindow(title, '60%', form, 'customizablewindow');
        win.close();
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
    },
    showProductApplicationMoreDetails: function (item) {

        //showEditProductOtherdetailWinFrm: function (item) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            section_id = record.get('section_id'),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            form = Ext.widget(childXtype);

        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        

    },
    showEditProductOtherdetailWinFrm: function (item) {

        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            form = Ext.widget(childXtype);

        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        if(section_id == 4){
            form.down('combo[name=device_type_id]').show();
       
        }
        else{
            form.down('combo[name=device_type_id]').hide();
       
        }
    },
    showProductPreviousComments: function (item) {
        
        this.fireEvent('showProductPreviousComments', item);

    },
    
    editpreviewNarcoticsPermitinformation: function (item) {
        this.fireEvent('editpreviewNarcoticsPermitinformation', item);
    },
    editpreviewPermitinformation: function (item) {
        this.fireEvent('editpreviewPermitinformation', item);
    },
    funcPrevGridApplicationDocuments: function (item) {
        this.fireEvent('funcPrevGridApplicationDocuments', item);
    },
    funcPrevEvaluationReportUpload: function (item) {
        this.fireEvent('funcPrevEvaluationReportUpload', item);
    },
    funcPrevAuditReportUpload: function (item) {
        this.fireEvent('funcPrevAuditReportUpload', item);
    },
    showPreviousUploadedDocs: function (item) {
        this.fireEvent('showPreviousUploadedDocs', item);
    },
    showTcRecommendation: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code'),
            childXtype = item.childXtype,
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            storeArray = eval(item.stores),
            arrayLength = storeArray.length,
            childObject = Ext.widget(childXtype);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=id]').setValue(record.get('recomm_id'));
        childObject.down('combo[name=decision_id]').setValue(record.get('decision_id'));
        childObject.down('textarea[name=comments]').setValue(record.get('comments'));
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    previewUploadedProductImage:function(item){
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            originaluploaded_image = record.get('originaluploaded_image');
            print_report(originaluploaded_image);
        
    },
    previewOnlineApplication: function (view, record) {
        this.fireEvent('previewImpExpOnlineApplication',view, record);
        
    },
    //the windows option 
    
    submitWinRejectedOnlineApplication: function (btn) {
        var win = btn.up('window'),
            action_url = 'submitRejectedOnlineApplication',
            
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=application_code]').getValue(),
            table_name = 'wb_importexport_applications';
            win.fireEvent('submitApplication', application_id, application_code, action_url, table_name);
        win.close();
    },
    queryWinOnlineApplication:function (btn) {
        var win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=application_code]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            application_status = win.down('hiddenfield[name=application_status_id]').getValue(),
           
            queriesGrid = Ext.widget('onlinequeriesgrid');

        queriesGrid.down('hiddenfield[name=application_id]').setValue(application_id);
        queriesGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        queriesGrid.down('hiddenfield[name=module_id]').setValue(module_id);

        if (application_status == 17 || application_status === 17) {
            queriesGrid.down('button[action=add_query]').setVisible(false);
            queriesGrid.down('button[action=submit_app]').setVisible(false);
            queriesGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        }

        funcShowCustomizableWindow(ref_no + ' - Queries', '55%', queriesGrid, 'customizablewindow');
        win.close();
    },
    showOnlineApplicationRejections: function (btn) {
        var win = btn.up('window'),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            winWidth = btn.winWidth,
            childXtype = btn.childXtype,
            childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        funcShowCustomizableWindow(tracking_no + ' Rejections', winWidth, childObject, 'customizablewindow');
    },
    receiveOnlineApplicationDetailsFrmBtn: function (btn) {
        Ext.getBody().mask('Please wait...');
        var storeID = btn.storeID,
            winWidth = btn.winWidth,
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            is_manager_query = 0;
        showOnlineSubmissionWin(application_id, module_id, sub_module_id, section_id, 'onlinesubmissionsfrm', winWidth, storeID, tracking_no, is_manager_query);
        
    },  submitManagerRejectedOnlineApplicationFrmBtn: function (btn) {
        var action_url = 'onlineApplicationManagerRejectionAction',
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            table_name = 'wb_product_applications',
            application_status = btn.application_status;
        btn.fireEvent('onlineManagerRejectionApplicationSubmit', application_id, action_url, table_name, application_status);
    },
    receiveWinOnlineApplicationDetails:function(btn){

        Ext.getBody().mask('Please wait...');
        var storeID = btn.storeID,
            winWidth = btn.winWidth,
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue();
            status_type_id = win.down('hiddenfield[name=status_type_id]').getValue();
            hasQueries = checkApplicationRaisedQueries(application_code, module_id);

            if ((hasQueries) && hasQueries == 1) {
                this.showQueriedApplicationSubmissionWin(btn);
            } else {
                this.submitOnlineApplicationDetailsToOfficer(btn);
            }
    },
    submitOnlineApplicationDetailsToOfficer: function (btn) {
        Ext.getBody().mask('Please wait...');
        var storeID = btn.storeID,
            winWidth = btn.winWidth,
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            is_manager_query = win.down('hiddenfield[name=is_manager_query]').getValue(),
            status_type_id = win.down('hiddenfield[name=status_type_id]').getValue(),
            
            application_status_id = win.down('hiddenfield[name=application_status_id]').getValue(),
            table_name = getApplicationTable(module_id),
            extraParams = [
                {
                    field_type: 'hiddenfield',
                    field_name: 'is_manager_query',
                    value: is_manager_query
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'table_name',
                    value: table_name
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'application_code',
                    value: application_code
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'application_status_id',
                    value: application_status_id
                }, {
                    field_type: 'hiddenfield',
                    field_name: 'status_type_id',
                    value: status_type_id
                }
            ];

        showOnlineSubmissionWin(application_id, module_id, sub_module_id, section_id, 'onlinesubmissionsfrm', winWidth, storeID, tracking_no, status_type_id, extraParams);

    },

    showQueriedApplicationSubmissionWin: function (btn) {
        Ext.getBody().unmask();
        var action_url = 'submitStructuredQueriedOnlineApplication',
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            table_name = 'wb_importexport_applications';
        //btn.fireEvent('submitApplication', application_id, application_code, action_url, table_name);
        Ext.MessageBox.alert('Info', 'The application will be forwarded back to the trader because you have raised queries', function (button) {
        var childObject = Ext.widget('onlinestructuredapplicationqueryfrm');
            childObject.down('hiddenfield[name=application_id]').setValue(application_id);
            childObject.down('hiddenfield[name=application_code]').setValue(application_code);
            childObject.down('hiddenfield[name=table_name]').setValue(table_name);
            childObject.down('hiddenfield[name=module_id]').setValue(module_id);
            childObject.down('button[name=submit_queriedapp]').action_url = action_url;
            funcShowCustomizableWindow('Online Application Submission - Queried', '35%', childObject, 'customizablewindow');
        });
    },
    submitRejectedOnlineApplication: function (item) {
       
        var btn = item.up('button'),
            grid = btn.up('grid'),
            action_url = 'submitRejectedOnlineApplication',
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            table_name = 'wb_importexport_applications';
            grid.fireEvent('submitApplication', application_id, application_code, action_url, table_name,grid);

    }, queryOnlineApplication: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            module_id = record.get('module_id'),
            ref_no = record.get('reference_no'),
            application_status = record.get('application_status_id'),
            queriesGrid = Ext.widget('onlinequeriesgrid');

            queriesGrid.down('hiddenfield[name=application_id]').setValue(application_id);
            queriesGrid.down('hiddenfield[name=application_code]').setValue(application_code);
            queriesGrid.down('hiddenfield[name=module_id]').setValue(module_id);
            
        if (application_status == 17 || application_status === 17) {
            queriesGrid.down('button[action=add_query]').setVisible(false);
            queriesGrid.down('button[action=submit_app]').setVisible(false);
            queriesGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        }
        funcShowCustomizableWindow(ref_no + ' - Queries', '55%', queriesGrid, 'customizablewindow');
    }, receiveOnlineApplicationDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var storeID = item.storeID,
            winWidth = item.winWidth,
            bttn = item.up('button'),
            record = bttn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            tracking_no = record.get('reference_no'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            is_manager_query = record.get('is_manager_query');
        showOnlineSubmissionWin(application_id, module_id, sub_module_id, section_id, 'onlinesubmissionsfrm', winWidth, storeID, tracking_no, is_manager_query);
    }, searchregisteredProducts: function (btn) {
        //
        var mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            var me = this,
                childXtype = btn.childXtype,
                winTitle = btn.winTitle,
                winWidth = btn.winWidth,
                grid = Ext.widget(childXtype);
                grid.height= 550;
            funcShowCustomizableWindow(winTitle, winWidth, grid, 'customizablewindow');
        }
        else {
            toastr.error('Alert: ', 'Application has already been saved, update the details to continue');
        }

    },
    funcSearchProductApplications: function (btn) {
        var grid = btn.up('grid'),
            store = grid.store,
            search_value = grid.down('textfield[name=search_value]').getValue(),
            search_field = grid.down('combo[name=search_field]').getValue();
        if (search_field != '') {
            store.removeAll();
            store.load({ params: { search_value: search_value, search_field: search_field } })
        }
    }, funcClearSearchApplications: function (btn) {
        var grid = btn.up('grid'),
            store = grid.store;
        grid.down('textfield[name=search_value]').setValue(''),
            search_field = grid.down('combo[name=search_field]').setValue('');

            store.removeAll();
        store.load();

    }, showApplicantSelectionList: function (btn) {
        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype);
            if (btn.applicantType == 'local') {
                childObject.applicantType = btn.applicantType;
            } else {
                childObject.applicantType = 'nonlocal';
            }
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    onPersonalPermitsPrevCardClick:function(btn){
        var wizard = btn.wizard,
        wizardPnl = btn.up(wizard);
        wizardPnl.getViewModel().set('atEnd', false);
    this.navigatePersonalPermitsTabs(btn, wizardPnl, 'prev');
    },
    onPrevCardClickOnline: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            wizardPnl.getViewModel().set('atEnd', false);
        this.navigateOnlineTabs(btn, wizardPnl, 'prev');
    },
    onNextCardClickOnline: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateOnlineTabs(btn, wizardPnl, 'next');

    },
    onPrevDeclarCardClickOnline: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            wizardPnl.getViewModel().set('atEnd', false);
        this.navigateDeclarationOnlineTabs(btn, wizardPnl, 'prev');
    },
    onNextDeclarCardClickOnline: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateDeclarationOnlineTabs(btn, wizardPnl, 'next');

    },
    navigatePersonalPermitsTabs: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            
            model = wizardPanel.getViewModel(),
            item, i, activeItem, activeIndex;
            console.log(layout);
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);
        
        // beginning disables previous
        if (activeIndex === 0) {
            
            wizardPanel.down('button[name=submit_btn]').setVisible(false);
            
            model.set('atBeginning', true);
        } else if (activeIndex ===1) {
            
            wizardPanel.down('button[name=submit_btn]').setVisible(true);
            
            model.set('atBeginning', false);
            model.set('atEnd', true);
        } else {
           
            wizardPanel.down('button[name=submit_btn]').setVisible(false);
            
            model.set('atBeginning', false);
           
        }

    },
    navigateDeclarationOnlineTabs: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            
            model = wizardPanel.getViewModel(),
            item, i, activeItem, activeIndex;
            console.log(layout);
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);
        
        // beginning disables previous
        if (activeIndex === 0) {
            
            wizardPanel.down('button[name=submit_btn]').setVisible(false);
            
            model.set('atBeginning', true);
        } else if (activeIndex === 2) {
            
            wizardPanel.down('button[name=submit_btn]').setVisible(true);
            
            
            model.set('atBeginning', false);
            model.set('atEnd', true);
        } else {
           
            wizardPanel.down('button[name=submit_btn]').setVisible(false);
            
            model.set('atBeginning', false);
           
        }

      //  wizardPanel.down('button[name=save_btn]').setVisible(true);

    },
    funcPreviewPreviousPermitDetails:function(btn){
        
        var previous_permit_no = btn.up('form').down('textfield[name=previous_permit_no]').getValue();
        if(previous_permit_no != ''){
            Ext.getBody().mask('loading...');
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/getImportExportPreviousPermitDetails',
                params: {
                    previous_permit_no: previous_permit_no
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                       
                    if (success == true || success === true) {
                        
                        var  results = resp.results,
                            success = results.success;
                            if(resp.success){
                                    this.previewPreviousDeclaredImpExpApplication(btn,results)
                            }
                            else{
                                toastr.error(message, 'Failure Response');
                            }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                    Ext.getBody().unmask();
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });

        }
        else{
            toastr.error('The Previous Permit Number wasnt Submitted/Enter', 'Failure Response');
        }
    },
    generateApplicationInvoice: function (application_id, module_id, invoice_id,application_code) {
    
       var action_url = 'reports/generateApplicationInvoice?application_id=' + application_id + '&&module_id=' + module_id + '&&invoice_id=' + invoice_id+ '&&application_code=' + application_code;
       print_report(action_url);
    },
    funcGeneratePayInvoice:function(btn, type_id){
           // type_id 1 for invoice and receipt 2

           var prev_paycntrnum = btn.up('form').down('textfield[name=prev_paycntrnum]').getValue();
           if(prev_paycntrnum != ''){
               Ext.getBody().mask('loading...');
               Ext.Ajax.request({
                   method: 'GET',
                   url: 'importexportpermits/getPreviewPreviousPermitInvoicePayment',
                   params: {
                       prev_paycntrnum: prev_paycntrnum,
                       type_id:type_id
                   },
                   headers: {
                       'Authorization': 'Bearer ' + access_token
                   },
                   success: function (response) {
                       Ext.getBody().unmask();
                       var resp = Ext.JSON.decode(response.responseText),
                           message = resp.message,
                           success = resp.success,
                            data = resp.data ;
                          
                       if (success == true || success === true) {
                           
                                   if(type_id ==1){
                                    this.generateApplicationInvoice(data.application_id, data.module_id, data.invoice_id,data.application_code);
                                   }
                                   else{
                                    var grid = Ext.widget(btn.gridXtype),
                                        doc_type = 29;
                                        grid.down('textfield[name=reference_no]').setValue(data.reference_no);
                                        grid.down('hiddenfield[name=module_id]').setValue(4);
                                        grid.down('combo[name=doc_type]').setValue(doc_type);
                                        
                                        funcShowCustomizableWindow('Applications Receipts', '60%', grid, 'customizablewindow');
                                   }
                                     
                               
                       } else {
                           toastr.error(message, 'Failure Response');
                       }
                       Ext.getBody().unmask();
                   },
                   failure: function (response) {
                       Ext.getBody().unmask();
                       var resp = Ext.JSON.decode(response.responseText),
                           message = resp.message,
                           success = resp.success;
                       toastr.error(message, 'Failure Response');
                   },
                   error: function (jqXHR, textStatus, errorThrown) {
                       Ext.getBody().unmask();
                       toastr.error('Error: ' + errorThrown, 'Error Response');
                   }
               });
   
           }
           else{
               toastr.error('The Payment Control Number not submitted/entered. ', 'Failure Response');
           }

    },
    funcPreviewPreviousPermitInvoice:function(btn){
        this.funcGeneratePayInvoice(btn, 1);
        
    },
    funcPreviewPreviousPermitReceipt:function(btn){
        this.funcGeneratePayInvoice(btn, 2);
        
    },
    navigateOnlineTabs: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            
            model = wizardPanel.getViewModel(),
            item, i, activeItem, activeIndex;
            console.log(layout);
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);
        
        // beginning disables previous
        if (activeIndex === 0) {
            
            wizardPanel.down('button[name=submit_btn]').setVisible(false);
            
            model.set('atBeginning', true);
        } else if (activeIndex === 3) {
            
            wizardPanel.down('button[name=submit_btn]').setVisible(true);
            
            
            model.set('atBeginning', false);
            model.set('atEnd', true);
        } else {
           
            wizardPanel.down('button[name=submit_btn]').setVisible(false);
            
            model.set('atBeginning', false);
           
        }

      //  wizardPanel.down('button[name=save_btn]').setVisible(true);

    },
    showAddFormWin: function (btn, evt, opts) {
       var form = Ext.widget(btn.form);
            form.setHeight('');
            funcShowCustomizableWindow(btn.title, "40%", form, "customizablewindow");
        
    },
    updateOnlineImporExportPermitReceivingBaseDetails: function (btn) {
        var wizard = btn.wizardpnl
             wizardPnl = btn.up(wizard),
             action_url = btn.action_url,
             form_panel = btn.form_panel,
            mainTabPnl = btn.up('window'),

            zone_id = mainTabPnl.down('combo[name=zone_id]').getValue(),
            active_application_code = mainTabPnl.down('hidden[name=active_application_code]').getValue(),
           
            importexportdetailsfrm = mainTabPnl.down(form_panel),
            importexportdetailsform = importexportdetailsfrm.getForm();

        if (!zone_id) {
            toastr.warning('Please select Zone Location!!', 'Warning Response');
            return false;
        }


        if (importexportdetailsform.isValid()) {
            importexportdetailsform.submit({
                url: 'importexportpermits/'+action_url,
                waitMsg: 'Please wait...',
                params: {
                    application_code: active_application_code,
                    
                    zone_id: zone_id,
                    '_token': token,
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                       
                    } else {
                        toastr.error(message, "Failure Response");
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
        }
    },
    savePersonalUsePermitReceivingBaseDetails:function(btn){
        var wizard = btn.wizardpnl,
        wizardPnl = btn.up(wizard),
        action_url = btn.action_url,
        form_panel = btn.form_panel,
       mainTabPnl = btn.up('#contentPanel'),

       containerPnl = mainTabPnl.getActiveTab();
       console.log(containerPnl);
       var process_id = containerPnl.down('hiddenfield[name=process_id]').getValue(),
       module_id = 4,
       sub_module_id = 15,
          zone_id = containerPnl.down('combo[name=zone_id]').getValue(),
       active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
       checkapplication_id= containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
       importexportdetailsfrm = containerPnl.down(form_panel),
       importexportdetailsform = importexportdetailsfrm.getForm();

   if (importexportdetailsform.isValid()) {
       importexportdetailsform.submit({
           url: 'importexportpermits/'+action_url,
           waitMsg: 'Please wait...',
           params: {
               active_application_id: active_application_id,
               module_id: module_id,
               sub_module_id: sub_module_id,
               zone_id: zone_id,
               '_token': token
           },
           headers: {
               'Authorization': 'Bearer ' + access_token
           },
           success: function (frm, action) {
               var resp = action.result,
                   message = resp.message,
                   success = resp.success,
                   active_application_id = resp.active_application_id,
                   application_code = resp.application_code,
                   tracking_no = resp.tracking_no;
               if (success == true || success === true) {
                   toastr.success(message, "Success Response");
                   if (checkapplication_id == '') {
                       containerPnl.down('hiddenfield[name=active_application_id]').setValue(active_application_id);
                       containerPnl.down('hiddenfield[name=active_application_code]').setValue(application_code);
                       containerPnl.down('displayfield[name=tracking_no]').setValue(tracking_no);
                   }

               } else {
                   toastr.error(message, "Failure Response");
               }
           },
           failure: function (frm, action) {
               var resp = action.result,
                   message = resp.message;
               toastr.error(message, "Failure Response");
           }
       });
   } else {
       toastr.warning('Please fill all the required fields!!', 'Warning Response');
   }


    },
    saveImporExportPermitReceivingBaseDetails: function (btn) {console.log( btn.form_panel);
        var wizard = btn.wizardpnl,
             wizardPnl = btn.up(wizard),
             action_url = btn.action_url,
             form_panel = btn.form_panel,
            mainTabPnl = btn.up('#contentPanel'),

            containerPnl = mainTabPnl.getActiveTab();
            console.log(containerPnl);
            var process_id = containerPnl.down('hiddenfield[name=process_id]').getValue(),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            zone_id = containerPnl.down('combo[name=zone_id]').getValue(),
            workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            checkapplication_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),

            applicantDetailsForm = containerPnl.down('importexportapplicantdetailsfrm'),
            senderreceiverdetailsfrm = containerPnl.down('senderreceiverdetailsfrm'),
            importexportpremisesfrm = containerPnl.down('importexportpremisesfrm'),
            
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            sender_receiver_id = senderreceiverdetailsfrm.down('hiddenfield[name=applicant_id]').getValue(),
           // premise_id = importexportpremisesfrm.down('hiddenfield[name=premise_id]').getValue(),
            importexportdetailsfrm = containerPnl.down(form_panel),
            importexportdetailsform = importexportdetailsfrm.getForm();
           
        if (!applicant_id) {
            //
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if (!sender_receiver_id) {
            //sender_receiver_id
            toastr.warning('Please select sender/Receiver details!!', 'Warning Response');
            return false;
        }
       
        if (importexportdetailsform.isValid()) {
            importexportdetailsform.submit({
                url: 'importexportpermits/'+action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    active_application_id: active_application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                   // premise_id:premise_id,
                    sender_receiver_id:sender_receiver_id,
                    zone_id: zone_id,
                    '_token': token
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        active_application_id = resp.active_application_id,
                        application_code = resp.application_code,
                        product_id = resp.product_id,
                        tracking_no = resp.tracking_no;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");

                            containerPnl.down('hiddenfield[name=active_application_id]').setValue(active_application_id);
                            containerPnl.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            containerPnl.down('displayfield[name=tracking_no]').setValue(tracking_no);
                      

                    } else {
                        toastr.error(message, "Failure Response");
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
        }
    }, onInitializeControlledDrugsImpPermits: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onInitializeControlledDrugsImpPermits', application_type);
    },
    funcSavePOEInspectionPermitDetails:function(btn){
        var form = btn.up('form'),
            action_url = btn.action_url,
             mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            active_application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();
            poe_application_id = containerPnl.down('hiddenfield[name=poe_application_id]').getValue()
            process_id = containerPnl.down('hiddenfield[name=process_id]').getValue()
            workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue()
            
            if (form.isValid()) {
                form.submit({
                    url: 'importexportpermits/'+action_url,
                    waitMsg: 'Please wait...',
                    params: {
                        active_application_code: active_application_code,
                        poe_application_id:poe_application_id,
                        workflow_stage_id:workflow_stage_id,
                        process_id:process_id,
                        '_token': token,
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    success: function (frm, action) {
                        var resp = action.result,
                            message = resp.message,
                            success = resp.success,
                            active_application_id = resp.active_application_id,
                            poe_application_id = resp.poe_application_id;
                        if (success == true || success === true) {
                            toastr.success(message, "Success Response");
                            containerPnl.down('hiddenfield[name=poe_application_id]').setValue(poe_application_id);
                            //reload the previous inspections 

                        } else {
                            toastr.error(message, "Failure Response");
                        }
                    },
                    failure: function (frm, action) {
                        var resp = action.result,
                            message = resp.message;
                        toastr.error(message, "Failure Response");
                    }
                });
            } else {
                toastr.warning('Please fill all the required fields!!', 'Warning Response');
            }

    },
    onNextCardClickPOE: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            motherPnl = wizardPnl.up('panel');

        motherPnl.getViewModel().set('atBeginning', false);
        this.navigatePOE(btn, wizardPnl, 'next');
    },
    onPrevCardClickPOE: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigatePOE(btn, wizardPnl, 'prev');
    },
    navigatePOE: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('panel'),
            application_id = motherPnl.down('hiddenfield[name=active_application_code]').getValue(),
            model = motherPnl.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
        if(application_id == ''){
               
            toastr.error('Search Import/Export Permit Application before you proceed for inspection!!', 'Failure');
            return;
        }  layout[direction]();
        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);
        //
        if (activeIndex === 0) {
            
            model.set('atBeginning', true);
            model.set('atEnd', false);
            wizardPanel.down('button[name=process_submission_btn]').setVisible(false);
        } else if (activeIndex === 1) {
            
                model.set('atEnd', true);
                model.set('atBeginning', false);
                
                wizardPanel.down('button[name=process_submission_btn]').setVisible(true);
            
            
        } else {
            model.set('atEnd', false);
            model.set('atBeginning', false);
        }
        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
        
    },funcSearchInspectionImportPermitDetails: function (btn,portal_id) {
        var me = this,
            mainTabPnl = btn.up('#contentPanel'),
            
            containerPnl = mainTabPnl.getActiveTab();
            importexportdetailsfrm = containerPnl.down('#importexportdetailsfrm'),
            senderreceiverdetailsfrm = containerPnl.down('#senderreceiverdetailsfrm'),
            poeinspectionpermitsproductsgrid = containerPnl.down('#poeinspectionpermitsproductsgrid'),
            importexportpermitsproductsgrid = containerPnl.down('importexportpermitsproductsgrid'),
            
            poe_application_id = containerPnl.down('hiddenfield[name=poe_application_id]').getValue();
            permit_no = containerPnl.down('textfield[name=permit_no]').getValue();
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue();
            if(poe_application_id != ''){
                
                toastr.error('Application has already Been Saved, enter/verify inspection details and proceed!!', 'Failure Response');
                return;
            }
            //activeTab
            Ext.getBody().mask('loading...');
            Ext.Ajax.request({
                method: 'GET',
                url: 'importexportpermits/getImportExportApprovedPermitDetails',
                params: {
                    permit_no: permit_no,
                    section_id:section_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                       
                    if (success == true || success === true) {
                        
                        var  results = resp.results,
                         is_permitexpired = results.is_permitexpired,
                         permit_verificationstatus_id = results.permit_verificationstatus_id,

                            senderReceiverDetails = resp.senderReceiverDetails,
                            premisesDetails = resp.premisesDetails,
                            zone_id = results.zone_id,
                            model = Ext.create('Ext.data.Model', results);
                            senderReceiverDetails = Ext.create('Ext.data.Model', senderReceiverDetails);
                            if(is_permitexpired == 1){
                                toastr.error('The selected permit has already Expired, kindly reject or request for permit Extension.', 'Alert');
                                Ext.getBody().unmask();
                                return;
                            }
                            if(permit_verificationstatus_id > 0){
                                toastr.error('The selected permit has already been verified, kindly confirm on the inspection detail and released consignment details permit Extension.', 'Alert');
                             //   return;
                            }
                            containerPnl.down('displayfield[name=verification_status]').setValue(results.verification_status);
                            containerPnl.down('displayfield[name=permit_expiry_date]').setValue(results.expiry_date);
                            
                        importexportdetailsfrm.loadRecord(model);

                        senderreceiverdetailsfrm.loadRecord(senderReceiverDetails);

                        zone_cbo.setValue(zone_id);

                        containerPnl.down('displayfield[name=application_status]').setValue(results.application_status);

                        containerPnl.down('displayfield[name=reference_no]').setValue(results.reference_no);
                        containerPnl.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                        containerPnl.down('hiddenfield[name=active_application_code]').setValue(results.application_code);
                        poeinspectionpermitsproductsgrid.store.load();
                        importexportpermitsproductsgrid.store.load();
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                    Ext.getBody().unmask();
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
           
    },showReceivingPoeApplicationSubmissionWin: function (btn,portal_id) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype);
            child.setHeight(250);
            mainTabPnl = btn.up('#contentPanel'),
            
            containerPnl = mainTabPnl.getActiveTab();
            poe_application_id = containerPnl.down('hiddenfield[name=poe_application_id]').getValue();
            child.down('hiddenfield[name=poe_application_id]').setValue(poe_application_id);
            if(poe_application_id != ''){
                
                child.down('hiddenfield[name=poe_application_id]').setValue(poe_application_id);
                funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
           
            }else{
                toastr.error('Save POE Information and update products details to submit!!', 'Failure Response');
                
            }
           
    },
    
    funcVerifyImportPermit: function (btn,portal_id) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype);
            child.setHeight(250);
            mainTabPnl = btn.up('#contentPanel'),
            
            containerPnl = mainTabPnl.getActiveTab();
            active_application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();

            if(active_application_code != ''){
                child.down('hiddenfield[name=active_application_code]').setValue(active_application_code);

                funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
           
            }else{
                toastr.error('Search Permit Details to Processed.', 'Failure Response');
                
            }
           
    },
    funcFilterInspectedPOEPermits:function(btn){
        var grid = btn.up('grid'),
            store = grid.store;
            store.load();

    },
    funcClearFilterInspectedPOEPermits:function(btn){
        var grid = btn.up('grid'),
            form = btn.up('form'),
            store = grid.store;
            store.load();
            form.reset();
    },
    funcExportInspectedpermits:function(btn){
        var grid = btn.up('grid'),
            form = btn.up('form'),
            form_values = form.getValues(),
            filterfield = grid.getPlugin('filterfield');
        form_values = convert_object(form_values);
             
        filter_array = Ext.pluck(filterfield.getgridFilters(grid), 'config');
        filter = Ext.JSON.encode(filter_array);	
        var action_url = 'reports/funcExportInspectedpermits?type=2&filter=' + encodeURIComponent(filter) + form_values;
        print_report(action_url);
    },
    funcExportInspectedPermitsProducts:function(btn){
        var grid = btn.up('grid'),
            form = btn.up('form'),
            form_values = form.getValues(),
            filterfield = grid.getPlugin('filterfield');
        form_values = convert_object(form_values);
             
        filter_array = Ext.pluck(filterfield.getgridFilters(grid), 'config');
        filter = Ext.JSON.encode(filter_array);	
        var action_url = 'reports/funcExportInspectedPermitsProducts?type=2&filter=' + encodeURIComponent(filter) + form_values;
        print_report(action_url);
    },
    
    //new
     onNewImportExportApplication: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onNewImportExportApplication', application_type,btn);
    },
     showDataCleanUpWindow: function(btn) {
        var chk = Ext.ComponentQuery.query("#importexportedittingswizardId")[0];
        if(!chk){
            var container = Ext.ComponentQuery.query("#contentPanel")[0],
             activeTab = container.getActiveTab(), 
             wrapper = activeTab.down(btn.wrapper),
             child = Ext.widget(btn.childXtype);
        wrapper.removeAll();
        wrapper.add(child);
    }else{
      toastr.warning('Another permit extension is already open!!', 'Close the other extension Window');  
    }
        
    },
    showIEApplicationsSelectionList: function(btn) {
        var wizard = btn.up('panel'),
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab();
            active_application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();

            editpnl = wizard.up('panel'),
            wrapper = editpnl.up('panel'),
            dash = wrapper.up('container'),
            cont = dash.up('container'),
            section_id = cont.down('hiddenfield[name=section_id]').getValue(),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype);


            if(active_application_code >0){
                toastr.warning('The License Application Has already been initiated, submit for processing!!', 'Alert');  
                return;
            }
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    loadSelectedApplication :function(view, record) {
        var wrapper = Ext.ComponentQuery.query("#importexportedittingswizardId")[0],
            app_pnl = wrapper.down('editimportexportdetailspnl'),
            app_form = app_pnl.down('editimportexportdetailsfrm'),
            sender_receiver_frm = wrapper.down('senderreceiverdetailsfrm'),
            premise_frm = app_pnl.down('importexportpremisesfrm'),
            extension_pnl = wrapper.down('extensionimportexportapppnl'),
            extension_frm = extension_pnl.down('importexportappextensionFrm'),
            grid = view.up('grid');
           
        //load applicant form details
        Ext.getBody().mask('loading...');
        Ext.Ajax.request({
                    url: "importexportpermits/getSenderreceiverinformation",
                    method: 'GET',
                    params: {
                        applicant_id: record.get('sender_receiver_id'),
                        start: 0,
                        limit: 1000
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                       
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message,
                            success = resp.success;
                        if (success == true || success === true) {
                            var model = Ext.create('Ext.data.Model', resp.results[0]);
                             
                           sender_receiver_frm.loadRecord(model);
                        } else {
                            toastr.error(message, 'Failure Response');
                            var model = Ext.create('Ext.data.Model', []);
                            return model;
                        }
                    },
                    failure: function (response) {
                        
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                        var model = Ext.create('Ext.data.Model', []);
                        return model;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      
                        toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                        var model = Ext.create('Ext.data.Model', []);
                        return model;
                    }
                });
       Ext.Ajax.request({
                    url: "importexportpermits/getTraderRegisteredPremisesDetails",
                    method: 'GET',
                    params: {
                        premise_id: record.get('premise_id'),
                        applicant_id: record.get('applicant_id'),
                        start: 0,
                        limit: 1000
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                       
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message,
                            success = resp.success;
                        if (success == true || success === true) {
                            var model = Ext.create('Ext.data.Model', resp.results[0]);
                               
                           premise_frm.loadRecord(model);
                        } else {
                            toastr.error(message, 'Failure Response');
                            
                        }
                    },
                    failure: function (response) {
                        
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      
                        toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                       
                    }
                });
        app_form.loadRecord(record);
        app_pnl.down('combo[name=zone_id]').setValue(record.get('zone_id'));
        wrapper.down('hiddenfield[name=active_application_code]').setValue(record.get('application_code'));
        wrapper.down('textfield[name=reference_no]').setValue(record.get('reference_no'));
        wrapper.down('hiddenfield[name=active_application_id]').setValue(record.get('application_id'));
        extension_frm.down('textfield[name=reference_no]').setValue(record.get('reference_no'));
        extension_frm.down('datefield[name=prev_expiry_date]').setValue(record.get('expiry_date'));
        wrapper.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
        wrapper.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
        Ext.getBody().unmask();
        grid.up('window').close();
    },


    setApplicationsDocument: function(item) {

         var wrapper = Ext.ComponentQuery.query("#importexportedittingswizardId")[0],
             active_application_id = wrapper.down('hiddenfield[name=active_application_id]').getValue();
         // if(active_application_id == ''){
         //     toastr.warning('Please select an application!!!', 'Warning Response');
         //    return false;
         // }
         
         item.down('hiddenfield[name=reference_table_name]').setValue('tra_product_applications');
         item.down('hiddenfield[name=table_name]').setValue('tra_query_uploaddocuments');
        
    },
    saveImporExportPermitReceivingEditDetails: function(btn) {
         var form_wizard = btn.up('panel'),
            import_pnl = form_wizard.down('editimportexportdetailspnl'),
            product_form = import_pnl.down('editimportexportdetailsfrm'),
            sender_receiver_frm = import_pnl.down('senderreceiverdetailsfrm'),
            premise_frm = import_pnl.down('importexportpremisesfrm'),
            sender_receiver_id = sender_receiver_frm.down('hiddenfield[name=applicant_id]').getValue(),
            zone_id = import_pnl.down('combo[name=zone_id]').getValue(),
            application_code = form_wizard.down('hiddenfield[name=active_application_code]').getValue(),
            frm = product_form.getForm();
        if(!zone_id){
            toastr.warning('Please select a zone!!!', 'Warning Response');
            return false;
          }
        if(!sender_receiver_id){
                toastr.warning('Please select a sender receiver!!!', 'Warning Response');
                return false;
              }
        if(frm.isValid()){
            frm.submit({
                url: "importexportpermits/saveImportExportEditionBaseDetails",
                params: { 
                    sender_receiver_id:sender_receiver_id,
                    zone_id:zone_id,
                    application_code:application_code
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
                        //form_wizard.down('hiddenfield[name=active_application_id]').setValue(response.record_id);
                        //form_wizard.down('hiddenfield[name=active_application_code]').setValue(response.application_code);
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
    saveImporExportAppExtensionEditDetails: function(btn) {
         var wrapper = Ext.ComponentQuery.query("#importexportedittingswizardId")[0],
             application_code = wrapper.down('hiddenfield[name=active_application_code]').getValue(),
             extension_pnl = wrapper.down('extensionimportexportapppnl'),
             extension_frm = extension_pnl.down('importexportappextensionFrm'),
             frm = extension_frm.getForm();
         if(frm.isValid()){
            frm.submit({
                url: "importexportpermits/saveImportExportExtensionBaseDetails",
                params: { 
                    application_code:application_code
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
                        extension_frm.down('hiddenfield[name=id]').setValue(response.record_id);
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
    print_permit: function (btn) {
       var pnl = btn.up('panel'),
           wizard = pnl.up('panel'),
           module_id = wizard.down('hiddenfield[name=module_id]').getValue(),
           reference_no = wizard.down('textfield[name=reference_no]').getValue(),
           action_url = 'summaryreport/generatedSystemReport?module_id=' + module_id +'&doc_type=' + 30 +'&reference_no=' + reference_no;
         print_report(action_url);
 },
 backHome: function(btn) {
     var child = Ext.widget(btn.childXtype),
         wrapper =Ext.ComponentQuery.query(btn.sec_dashboard)[0];
     wrapper.removeAll();
     wrapper.add(child);
 },
    previewInspectionDetails: function(row_btn) {
        var btn = row_btn.up('button'),
            record = btn.getWidgetRecord(),
            inspectionPreviewPnl = Ext.widget('poeinspectionpreviewpnl'),
            inspectionFrm = inspectionPreviewPnl.down('form'),
            application_id = record.get('active_application_id');
        Ext.Ajax.request({
            method: 'GET',
            url: 'importexportpermits/prepareReceivingpoeinspectionswizard',
            params: {
                application_id: application_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success,
                    results = resp.results;
                if (success == true || success === true) {
                    if (results) {
                        var model = Ext.create('Ext.data.Model', results);
                        inspectionFrm.loadRecord(model);
                    }
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function(response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                toastr.error(message, 'Failure Response');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
        funcShowCustomizableWindow("Inspection Preview", '60%', inspectionPreviewPnl, 'customizablewindow');
    },
    showConsigneeDetails:function(){
            var consignee_win =  Ext.widget('consigneedetailsgrid');
            
        funcShowCustomizableWindow("Consignee Details", '80%', consignee_win, 'customizablewindow');
    },  funcActiveImportOtherInformationTab: function (tab) {

        this.fireEvent('funcActiveImportOtherInformationTab', tab);

    },
    doSaveImportValidationecommendationDetails: function (btn) {
        this.fireEvent('doSaveImportValidationecommendationDetails',btn);
    },
    
    showAddApplicationUnstrcuturedQueries: function (btn) {
        var grid = Ext.widget('applicationunstructuredqueriesgrid'),
            wizard = btn.up('panel'),
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab();
            application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue();
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue();
            sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue();
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue();
            application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue();
            workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue();
            
            
            grid.down('hiddenfield[name=module_id]').setValue(module_id);
            grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            grid.down('hiddenfield[name=section_id]').setValue(section_id);

            grid.down('hiddenfield[name=application_code]').setValue(application_code);
            grid.down('hiddenfield[name=application_id]').setValue(application_id);
            grid.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            grid.setHeight(450);
           
           funcShowCustomizableWindow('Query', "70%", grid, 'customizablewindow');
    },


});