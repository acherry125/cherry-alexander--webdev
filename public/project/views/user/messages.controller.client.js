// look into "Pusher"
(function() {
    angular
        .module("EventHorizon")
        .controller("UserMessagesController", UserMessagesController);


    function UserMessagesController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.uid = userId;
        vm.messageDict = {};
        vm.toggleMessage = toggleMessage;
        vm.replyMessage = replyMessage;
        vm.deleteMessage = deleteMessage;

        function init() {
            UserService
                .findUserById(userId)
                .then(
                    function(response) {
                        vm.user = response.data;
                        vm.user.messages.reverse();
                        var msgs = vm.user.messages;
                        for(var i in msgs) {
                            vm.messageDict[msgs[i]._id] = {"toggled": false, "reply": "", "notDeleted": true};
                        }
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
        
        init();

        function toggleMessage(messageId) {
            vm.messageDict[messageId].toggled = !vm.messageDict[messageId].toggled;
        }

        function replyMessage(recipientId, messageId, orgName) {
            // vm.messageContent doesn't seem like a good solution
            var message = {name: vm.user.username, organization: orgName, message: vm.messageDict[messageId].reply};
            UserService
                .sendMessage(recipientId, userId, message)
                .then(
                    function(response) {
                        vm.messageContent = "";
                        vm.success = "Message Sent!";
                        vm.messageDict[messageId].reply = "";
                    },
                    function(error) {
                        vm.error = error.data
                    }
                )
        }
        
        function deleteMessage(messageId) {
            UserService
                .deleteMessage(userId, messageId)
                .then(
                    function(response) {
                        vm.messageDict[messageId].notDeleted = false;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

    }

})();
